const testUtils = require('../testUtils.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');

test('should change best available object status', async () => {
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 3, 'lolzor');
    var labels = {
        'B-4': testUtils.someLabels('4', 'seat', 'B', 'row'),
        'B-5': testUtils.someLabels('5', 'seat', 'B', 'row'),
        'B-6': testUtils.someLabels('6', 'seat', 'B', 'row')
    }
    expect(bestAvailableObjs.nextToEachOther).toBe(true);
    expect(bestAvailableObjs.objects).toContain('B-4');
    expect(bestAvailableObjs.objects).toContain('B-5');
    expect(bestAvailableObjs.objects).toContain('B-6');
    expect(bestAvailableObjs.objects.length).toBe(3);
    expect(bestAvailableObjs.labels).toEqual(labels);
});

test('should change best available object status with categories', async () => {
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 3, 'lolzor', ["cat2"]);

    expect(bestAvailableObjs.objects).toContain('C-4');
    expect(bestAvailableObjs.objects).toContain('C-5');
    expect(bestAvailableObjs.objects).toContain('C-6');
    expect(bestAvailableObjs.objects.length).toBe(3);
});

test('should change best available object status with extra data', async () => {
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var extraData = [
        {"foo": "bar"},
        {"foo": "baz"}
    ];
    var bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 2, 'lolzor', null, null, extraData);
    var b4Status = await client.events.retrieveObjectStatus(event.key, 'B-4');
    var b5Status = await client.events.retrieveObjectStatus(event.key, 'B-5');
    expect(bestAvailableObjs.objects).toContain('B-4');
    expect(bestAvailableObjs.objects).toContain('B-5');
    expect(bestAvailableObjs.objects.length).toBe(2);
    expect(b4Status.extraData).toEqual(extraData[0]);
    expect(b5Status.extraData).toEqual(extraData[1]);
});

test('should change best available object status with hold token', async () => {
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var holdToken = await client.holdTokens.create();
    var bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 1, ObjectStatus.HELD, null, holdToken.holdToken);
    var objStatus = await client.events.retrieveObjectStatus(event.key, bestAvailableObjs.objects[0]);
    expect(objStatus.status).toBe(ObjectStatus.HELD);
    expect(objStatus.holdToken).toBe(holdToken.holdToken);
});

test('should change best available object status with orderId', async () => {
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 1, 'lolzor', null, null, null, 'anOrder');
    var objStatus = await client.events.retrieveObjectStatus(event.key, bestAvailableObjs.objects[0]);
    expect(objStatus.orderId).toBe('anOrder');
});

test('should book best available object ', async () => {
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var bestAvailableObjs = await client.events.bookBestAvailable(event.key, 3);

    expect(bestAvailableObjs.nextToEachOther).toBe(true);
    expect(bestAvailableObjs.objects).toEqual(["B-4", "B-5", "B-6"]);
});

test('should hold best available object ', async () => {
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var holdToken = await client.holdTokens.create();
    var bestAvailableObjs = await client.events.holdBestAvailable(event.key, 1, holdToken.holdToken);
    var objStatus = await client.events.retrieveObjectStatus(event.key, bestAvailableObjs.objects[0])
    expect(objStatus.status).toBe(ObjectStatus.HELD);
    expect(objStatus.holdToken).toBe(holdToken.holdToken);
});
