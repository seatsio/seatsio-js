const testUtils = require('../testUtils.js');
const ObjectProperties = require('../../src/Events/ObjectProperties.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');

test('should list status changes', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    let labels = [];

    for await (let statusChange of client.events.statusChanges(event.key)) {
        labels.push(statusChange.objectLabel);
    }

    expect(labels.sort()).toEqual(['A-1', 'A-2', 'A-3']);
});

test('properties of status change', async () => {
    let chartKey = testUtils.getChartKey();
    let objectStatus = new ObjectStatus();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let obj = new ObjectProperties('A-1').setExtraData({'foo': 'bar'});
    await client.events.book(event.key, obj, null, 'order1');

    let statusChanges = client.events.statusChanges(event.key);
    let statusChangesIterator = statusChanges[Symbol.asyncIterator]();
    let statusChange = await statusChangesIterator.next();

    expect(statusChange.value.id).toBeTruthy();
    expect(statusChange.value.date).toBeTruthy();
    expect(statusChange.value.orderId).toBe('order1');
    expect(statusChange.value.objectLabel).toBe('A-1');
    expect(statusChange.value.status).toBe(objectStatus.BOOKED);
    expect(statusChange.value.eventId).toBe(event.id);
    expect(statusChange.value.extraData).toEqual({'foo': 'bar'});
});
