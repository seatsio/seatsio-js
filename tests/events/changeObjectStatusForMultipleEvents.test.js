const testUtils = require('../testUtils.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');

test('should change object status for multiple events', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event1 = await client.events.create(chartKey);
    var event2 = await client.events.create(chartKey);
    await client.events.changeObjectStatus([event1.key, event2.key], 'A-1', 'lolzor')
    var objStatus1 = await client.events.retrieveObjectStatus(event1.key, 'A-1')
    var objStatus2 = await client.events.retrieveObjectStatus(event2.key, 'A-1')

    expect(objStatus1.status).toBe('lolzor');
    expect(objStatus2.status).toBe('lolzor');
});

test('should release multiple events', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event1 = await client.events.create(chartKey);
    var event2 = await client.events.create(chartKey);
    await client.events.book([event1.key, event2.key], 'A-1');
    var objStatus1 = await client.events.retrieveObjectStatus(event1.key, 'A-1')
    var objStatus2 = await client.events.retrieveObjectStatus(event2.key, 'A-1')

    expect(objStatus1.status).toBe(ObjectStatus.BOOKED);
    expect(objStatus2.status).toBe(ObjectStatus.BOOKED);
});

test('should release multiple events', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event1 = await client.events.create(chartKey);
    var event2 = await client.events.create(chartKey);
    await client.events.book([event1.key, event2.key], 'A-1');
    await client.events.release([event1.key, event2.key], 'A-1');
    var objStatus1 = await client.events.retrieveObjectStatus(event1.key, 'A-1')
    var objStatus2 = await client.events.retrieveObjectStatus(event2.key, 'A-1')

    expect(objStatus1.status).toBe(ObjectStatus.FREE);
    expect(objStatus2.status).toBe(ObjectStatus.FREE);
});

test('should hold multiple events', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event1 = await client.events.create(chartKey);
    var event2 = await client.events.create(chartKey);
    var holdToken = await client.holdTokens.create();
    await client.events.hold([event1.key, event2.key], 'A-1', holdToken.holdToken);

    var objStatus1 = await client.events.retrieveObjectStatus(event1.key, 'A-1')
    var objStatus2 = await client.events.retrieveObjectStatus(event2.key, 'A-1')

    expect(objStatus1.status).toBe(ObjectStatus.HELD);
    expect(objStatus2.status).toBe(ObjectStatus.HELD);
});
