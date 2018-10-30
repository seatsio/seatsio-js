const testUtils = require('../testUtils.js');

test('should list all charts', async () => {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart1 = await client.charts.create();
  var chart2 = await client.charts.create();
  var chart3 = await client.charts.create();
  var page = await client.charts.listFirstPage();
  var chartKeys = page.items.map((chart) => chart.key);
  expect(chartKeys).toContain(chart1.key)
  expect(chartKeys).toContain(chart2.key)
  expect(chartKeys).toContain(chart3.key);
});
