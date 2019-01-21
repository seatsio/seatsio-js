const testUtils = require('../testUtils.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');

test('should book an object', async () => {
    let chartKey = testUtils.getChartKey();
    let objectStatus = new ObjectStatus();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);

    let bookRes = await client.events.book(event.key, ['A-1', 'A-2']);

    let retrievedObjStatus1 = await client.events.retrieveObjectStatus(event.key, 'A-1');
    let retrievedObjStatus2 = await client.events.retrieveObjectStatus(event.key, 'A-2');
    expect(retrievedObjStatus1.status).toEqual(objectStatus.BOOKED);
    expect(retrievedObjStatus2.status).toEqual(objectStatus.BOOKED);
    expect(Object.keys(bookRes.objects)).toEqual(['A-1', 'A-2']);
});

test('should book an object with quantity', async () => {
    let chartKey = testUtils.getChartKey();
    let objectStatus = new ObjectStatus();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);

    await client.events.book(event.key, {"objectId": "GA1", "quantity": 100});

    let retrievedObjStatus = await client.events.retrieveObjectStatus(event.key, 'GA1');
    expect(retrievedObjStatus.status).toEqual(objectStatus.BOOKED);
    expect(retrievedObjStatus.quantity).toEqual(100);
});

test('should book an object with sections', async () => {
    let chartKey = testUtils.getChartKey();
    let objectStatus = new ObjectStatus();
    await testUtils.createTestChartWithSections(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);

    let bookRes = await client.events.book(event.key, ['Section A-A-1', 'Section A-A-2']);

    let retrievedObjStatus1 = await client.events.retrieveObjectStatus(event.key, 'Section A-A-1');
    let retrievedObjStatus2 = await client.events.retrieveObjectStatus(event.key, 'Section A-A-2');
    expect(retrievedObjStatus1.status).toEqual(objectStatus.BOOKED);
    expect(retrievedObjStatus2.status).toEqual(objectStatus.BOOKED);
    expect(bookRes.objects['Section A-A-1'].entrance).toBe('Entrance 1');
    expect(bookRes.objects['Section A-A-1'].section).toBe('Section A');
    expect(bookRes.objects['Section A-A-1'].labels).toEqual(testUtils.someLabels('1', 'seat', 'A', 'row', 'Section A'));
});

test('should hold and then book, check hold token exists', async () => {
    let chartKey = testUtils.getChartKey();
    let objectStatus = new ObjectStatus();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken = await client.holdTokens.create();
    await client.events.hold(event.key, 'A-1', holdToken.holdToken);

    await client.events.book(event.key, 'A-1', holdToken.holdToken);

    let objStatus = await client.events.retrieveObjectStatus(event.key, 'A-1');
    expect(objStatus.status).toBe(objectStatus.BOOKED);
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
