const SeatsioClient = require('../../src/SeatsioClient.js');
const testUtils = require('../testUtils.js');

test('should copy draft version of a chart', async ()=> {
  const user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create('oldName');
  await client.events.create(chart.key);
  await client.charts.update(chart.key, 'newName');
  var copiedChart = await client.charts.copyDraftVersion(chart.key);
  expect(copiedChart.name).toEqual('newName (copy)');
  expect(chart.key).not.toBe(copiedChart.key);
});
