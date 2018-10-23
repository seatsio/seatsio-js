const SeatsioClient = require('../../src/SeatsioClient.js');
const testUtils = require('../testUtils.js');

test('should remove tag', async ()=> {
  const user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create();
  await client.charts.addTag(chart.key, 'tag1');
  await client.charts.addTag(chart.key, 'tag2');
  await client.charts.removeTag(chart.key, 'tag1');
  var retrievedChart = await client.charts.retrieve(chart.key);
  expect(retrievedChart.tags).toEqual(['tag2']);
  expect(retrievedChart.tags).not.toContain(['tag1']);

});
