const testUtils = require('../testUtils.js');
const ObjectProperties = require('../../src/Events/ObjectProperties.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');

test('should list status changes', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    var chart = await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');

    var statusChangesPage = await client.events.statusChanges(event.key).all();
    var labels = [];
    for (let item of statusChangesPage) {
        labels.push(item.objectLabel);
    }

    expect(labels).toContain('A-1');
    expect(labels).toContain('A-2');
    expect(labels).toContain('A-1');

});

test('properties of status change', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    var chart = await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var obj = new ObjectProperties('A-1').setExtraData({'foo': 'bar'});
    await client.events.book(event.key, obj, null, 'order1');

    var statusChangesPage = await client.events.statusChanges(event.key).all();
    var statusChange = statusChangesPage.items[0];

    expect(statusChange.id).toBeDefined();
    expect(statusChange.date).toBeDefined();
    expect(statusChange.orderId).toBe('order1');
    expect(statusChange.objectLabel).toBe('A-1');
    expect(statusChange.status).toBe(ObjectStatus.BOOKED);
    expect(statusChange.eventId).toBe(event.id);
    expect(statusChange.extraData).toEqual({'foo': 'bar'});
});
