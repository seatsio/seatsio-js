const testUtils = require('../testUtils.js');

test('should retrieve published version of a chart', async () => {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create();
  var retrievedChart = await client.charts.retrievePublishedVersion(chart.key);

  expect(retrievedChart.name).toEqual('Untitled chart');
  expect(retrievedChart.venueType).toEqual('MIXED');
  expect(retrievedChart.categories.list).toEqual([]);
  expect(retrievedChart.categories.list).toBeDefined();
  expect(retrievedChart.subChart).toBeDefined();
  expect(retrievedChart.subChart).not.toBeFalsy();
  expect(retrievedChart.subChart).not.toBeNull();
});
