const testUtils = require('../testUtils.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');

test('should retrieve object status', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);

    let retrievedObj = await client.events.retrieveObjectStatus(event.key, 'A-1');

    expect(retrievedObj.status).toEqual(ObjectStatus.FREE);
    expect(retrievedObj.ticketType).toBeUndefined();
    expect(retrievedObj.extraData).toBeUndefined();
});
