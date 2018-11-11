const testUtils = require('../testUtils.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');

test('should release objects', async () => {
    let chartKey = testUtils.getChartKey();
    let objectStatus = new ObjectStatus();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, ["A-1", "A-2"]);

    let releaseRes = await client.events.release(event.key, ["A-1", "A-2"]);

    let status1 = await client.events.retrieveObjectStatus(event.key, 'A-1');
    let status2 = await client.events.retrieveObjectStatus(event.key, 'A-2');
    expect(status1.status).toBe(objectStatus.FREE);
    expect(status2.status).toBe(objectStatus.FREE);
    expect(releaseRes.labels).toEqual({
        'A-1': testUtils.someLabels('1', 'seat', 'A', 'row'),
        'A-2': testUtils.someLabels('2', 'seat', 'A', 'row')
    });
});

test('should release objects with hold tokens', async () => {
    let chartKey = testUtils.getChartKey();
    let objectStatus = new ObjectStatus();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken = await client.holdTokens.create();
    await client.events.hold(event.key, 'A-1', holdToken.holdToken);

    await client.events.release(event.key, 'A-1', holdToken.holdToken);

    let objStatus = await client.events.retrieveObjectStatus(event.key, 'A-1');
    expect(objStatus.status).toBe(objectStatus.FREE);
    expect(objStatus.holdToken).toBeFalsy();
});

test('should release objects with order id', async () => {
    let chartKey = testUtils.getChartKey();
    let objectStatus = new ObjectStatus();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');

    await client.events.release(event.key, 'A-1', null, 'order1');

    let objStatus = await client.events.retrieveObjectStatus(event.key, 'A-1');
    expect(objStatus.status).toBe(objectStatus.FREE);
    expect(objStatus.orderId).toBe('order1');
});
