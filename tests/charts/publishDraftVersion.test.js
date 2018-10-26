const testUtils = require('../testUtils.js');

test('should publish a chart', async ()=> {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create('oldName');
  await client.events.create(chart.key);
  await client.charts.update(chart.key, 'newName');
  await client.charts.publishDraftVersion(chart.key);
  var retrievedChart = await client.charts.retrieve(chart.key);
  expect(retrievedChart.status).toBe('PUBLISHED');
  expect(retrievedChart.name).toBe('newName');
});
