const testUtils = require('../testUtils.js');

test("should update event's chart key", async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chart1 = await client.charts.create();
    var chart2 = await client.charts.create();
    var event = await client.events.create(chart1.key);
    await client.events.update(event.key, chart2.key);
    var retrievedEvent = await client.events.retrieve(event.key);
    expect(retrievedEvent.chartKey).toBe(chart2.key);
    expect(retrievedEvent.updatedOn).toBeDefined();
    expect(retrievedEvent.updatedOn).toBeTruthy();
});

test('should update event key', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chart = await client.charts.create();
    var event = await client.events.create(chart.key);
    await client.events.update(event.key, null, 'newKey');
    var retrievedEvent = await client.events.retrieve('newKey');
    expect(retrievedEvent.chartKey).toBe(chart.key);
    expect(retrievedEvent.key).toBe('newKey');
});


test('should update bookWholeTables parameter of an event', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chart = await client.charts.create();
    var event = await client.events.create(chart.key);
    await client.events.update(event.key, null, null, true);
    var retrievedEvent = await client.events.retrieve(event.key);
    expect(retrievedEvent.chartKey).toBe(chart.key);
    expect(retrievedEvent.key).toBe(event.key);
    expect(retrievedEvent.bookWholeTables).toBe(true);
});

test('should update tableBookingModes parameter of an event', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChartWithTables(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    await client.events.update(event.key, null, null, {"T1": "BY_TABLE", "T2": "BY_SEAT"});
    var retrievedEvent = await client.events.retrieve(event.key);
    expect(retrievedEvent.chartKey).toBe(chartKey);
    expect(retrievedEvent.key).toBe(event.key);
    expect(retrievedEvent.bookWholeTables).toBe(false);
    expect(retrievedEvent.tableBookingModes).toEqual({"T1": "BY_TABLE", "T2": "BY_SEAT"});
});
