const testUtils = require('../testUtils.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');

test('should release objects', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    await client.events.book(event.key, ["A-1", "A-2"]);
    var releaseRes = await client.events.release(event.key, ["A-1", "A-2"]).catch((err) => console.log(err));
    var status1 = await client.events.retrieveObjectStatus(event.key, 'A-1');
    var status2 = await client.events.retrieveObjectStatus(event.key, 'A-2');

    expect(status1.status).toBe(ObjectStatus.FREE);
    expect(status2.status).toBe(ObjectStatus.FREE);
    expect(releaseRes.labels).toEqual({
        'A-1': testUtils.someLabels('1', 'seat', 'A', 'row'),
        'A-2': testUtils.someLabels('2', 'seat', 'A', 'row')
    });
});

test('should release objects with hold tokens', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var holdToken = await client.holdTokens.create();
    await client.events.hold(event.key, 'A-1', holdToken.holdToken);
    await client.events.release(event.key, 'A-1', holdToken.holdToken);
    var objStatus = await client.events.retrieveObjectStatus(event.key, 'A-1');

    expect(objStatus.status).toBe(ObjectStatus.FREE);
    expect(objStatus.holdToken).toBeUndefined();
    expect(objStatus.holdToken).toBeFalsy();
});

test('should release objects with order id', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.release(event.key, 'A-1', null, 'order1');
    var objStatus = await client.events.retrieveObjectStatus(event.key, 'A-1');

    expect(objStatus.status).toBe(ObjectStatus.FREE);
    expect(objStatus.orderId).toBe('order1');
});
