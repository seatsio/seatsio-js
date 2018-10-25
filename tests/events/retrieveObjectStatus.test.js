const testUtils = require('../testUtils.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');

test('should retrive object status', async () => {
  const user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chartKey = await testUtils.createTestChartFromFile('/sampleChart.json', user.designerKey);
  var event = await client.events.create(chartKey);
  var objStatus = new ObjectStatus();
  var retrievedObj = await client.events.retrieveObjectStatus(event.key, 'A-1');
  expect(retrievedObj.status).toEqual(objStatus.FREE);
  expect(retrievedObj.ticketType).toBeUndefined();
  expect(retrievedObj.extraData).toBeUndefined();
});
