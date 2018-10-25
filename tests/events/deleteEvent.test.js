const testUtils = require('../testUtils.js');

test('should delete an event', async ()=> {
  const user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create();
  var event = await client.events.create(chart.key);
  await client.events.delete(event.key);
  var retrieveFail = await client.events.retrieve(event.key).catch( (err) => err.response);
  expect(retrieveFail.data.status).toBe(404);
});
