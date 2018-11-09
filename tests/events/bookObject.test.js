const testUtils = require('../testUtils.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');

test('should book an object', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let labels = {
        'A-1': testUtils.someLabels('1', 'seat', 'A', 'row'),
        'A-2': testUtils.someLabels('2', 'seat', 'A', 'row')
    };
    let event = await client.events.create(chartKey);

    let bookRes = await client.events.book(event.key, ['A-1', 'A-2']);

    let retrievedObjStatus1 = await client.events.retrieveObjectStatus(event.key, 'A-1');
    let retrievedObjStatus2 = await client.events.retrieveObjectStatus(event.key, 'A-2');
    expect(retrievedObjStatus1.status).toEqual(ObjectStatus.BOOKED);
    expect(retrievedObjStatus2.status).toEqual(ObjectStatus.BOOKED);
    expect(bookRes.labels).toEqual(labels);
});

test('should book an object with quantity', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);

    await client.events.book(event.key, {"objectId": "GA1", "quantity": 100});

    let retrievedObjStatus = await client.events.retrieveObjectStatus(event.key, 'GA1');
    expect(retrievedObjStatus.status).toEqual(ObjectStatus.BOOKED);
    expect(retrievedObjStatus.quantity).toEqual(100);
});

test('should book an object with sections', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChartWithSections(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let labels = {
        'Section A-A-1': testUtils.someLabels('1', 'seat', 'A', 'row', 'Section A', 'Entrance 1'),
        'Section A-A-2': testUtils.someLabels('2', 'seat', 'A', 'row', 'Section A', 'Entrance 1')
    };

    let bookRes = await client.events.book(event.key, ['Section A-A-1', 'Section A-A-2']);

    let retrievedObjStatus1 = await client.events.retrieveObjectStatus(event.key, 'Section A-A-1');
    let retrievedObjStatus2 = await client.events.retrieveObjectStatus(event.key, 'Section A-A-2');
    expect(retrievedObjStatus1.status).toEqual(ObjectStatus.BOOKED);
    expect(retrievedObjStatus2.status).toEqual(ObjectStatus.BOOKED);
    expect(bookRes.labels).toEqual(labels);
});

test('should hold and then book, check hold token exists', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken = await client.holdTokens.create();
    await client.events.hold(event.key, 'A-1', holdToken.holdToken);

    await client.events.book(event.key, 'A-1', holdToken.holdToken);

    let objStatus = await client.events.retrieveObjectStatus(event.key, 'A-1');
    expect(objStatus.status).toBe(ObjectStatus.BOOKED);
    expect(objStatus.holdToken).toBeFalsy();
});

test('should check booking with orderId', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);

    await client.events.book(event.key, 'A-1', null, 'order1');

    let objStatus = await client.events.retrieveObjectStatus(event.key, 'A-1');
    expect(objStatus.orderId).toBe('order1');
});
