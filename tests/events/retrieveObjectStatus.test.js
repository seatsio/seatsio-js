const testUtils = require('../testUtils.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');

test('should retrive object status', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    var retrievedObj = await client.events.retrieveObjectStatus(event.key, 'A-1');
    expect(retrievedObj.status).toEqual(ObjectStatus.FREE);
    expect(retrievedObj.ticketType).toBeUndefined();
    expect(retrievedObj.extraData).toBeUndefined();
});
