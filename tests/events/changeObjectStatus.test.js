const testUtils = require('../testUtils.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');
const ObjectProperties = require('../../src/Events/ObjectProperties.js');

test('should change object status', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var result = await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')

    expect(result.labels).toEqual({'A-1': testUtils.someLabels('1', 'seat', 'A', 'row')});
});


test('should change object status for table seat', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChartWithTables(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var result = await client.events.changeObjectStatus(event.key, 'T1-1', 'lolzor');

    expect(result.labels).toEqual({'T1-1': testUtils.someLabels('1', 'seat', 'T1', 'table')});
});

test('should change object status for table', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChartWithTables(chartKey, user.designerKey);
    var event = await client.events.create(chartKey, null, true);
    var result = await client.events.changeObjectStatus(event.key, 'T1', 'lolzor');

    expect(result.labels).toEqual({'T1': testUtils.someLabels('T1', 'table')});
});

test('should change object status with GA', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var result = await client.events.changeObjectStatus(event.key, '34', 'lolzor');

    expect(result.labels).toEqual({'34': testUtils.someLabels('34', 'generalAdmission')});
});

test('should change object status with objectId as string', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor');
    var objStatus = await client.events.retrieveObjectStatus(event.key, "A-1");
    expect(objStatus.status).toBe('lolzor');
});

test('should change object status with objectId inside class', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    await client.events.changeObjectStatus(event.key, new ObjectProperties('A-1'), 'lolzor');
    var objStatus = await client.events.retrieveObjectStatus(event.key, "A-1");
    expect(objStatus.status).toBe('lolzor');
});

test('should change object status with hold token', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var holdToken = await client.holdTokens.create();
    await client.events.changeObjectStatus(event.key, 'A-1', ObjectStatus.HELD, holdToken.holdToken);
    var objStatus = await client.events.retrieveObjectStatus(event.key, "A-1");
    expect(objStatus.status).toBe(ObjectStatus.HELD);
    expect(objStatus.holdToken).toBe(holdToken.holdToken);
});

test('should change object status with OrderId', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var holdToken = await client.holdTokens.create();
    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor', null, "order1");
    var objStatus = await client.events.retrieveObjectStatus(event.key, "A-1");
    expect(objStatus.orderId).toBe('order1');
});
