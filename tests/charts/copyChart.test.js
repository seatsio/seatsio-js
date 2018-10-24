const SeatsioClient = require('../../src/SeatsioClient.js');
const testUtils = require('../testUtils.js');

test('should copy chart', async ()=>{
  const user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create('My Chart', 'BOOTHS');
  var copiedChart = await client.charts.copy(chart.key);
  var retrievedCopiedChart = await client.charts.retrievePublishedVersion(copiedChart.key);
  expect(copiedChart.name).toEqual('My Chart (copy)');
  expect(copiedChart.key).not.toBe(chart.key);
  expect(retrievedCopiedChart.venueType).toEqual('BOOTHS');
});
