const testUtils = require('../testUtils.js');
const ChartListParams = require('../../src/Charts/ChartListParams.js')

test('should list first page of charts', async () => {
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


test('should list first page of charts with filter', async () => {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart1 = await client.charts.create('foo');
  var chart2 = await client.charts.create('foo');
  var chart3 = await client.charts.create('bar');
  var chart4 = await client.charts.create('foo');
  var params = new ChartListParams().withFilter('foo');
  var page = await client.charts.listFirstPage(params);
  var chartKeys = page.items.map((chart) => chart.key);

  expect(chartKeys).toContain(chart1.key)
  expect(chartKeys).toContain(chart2.key)
  expect(chartKeys).not.toContain(chart3.key);
  expect(chartKeys).toContain(chart4.key);
});

test('pageSize of list first page of charts with filter', async () => {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart1 = await client.charts.create('foo');
  var chart2 = await client.charts.create('foo');
  var chart3 = await client.charts.create('bar');
  var chart4 = await client.charts.create('foo');
  var page = await client.charts.listFirstPage(null, 2);
  var chartKeys = page.items.map((chart) => chart.key);

  expect(chartKeys).not.toContain(chart1.key)
  expect(chartKeys).not.toContain(chart2.key)
  expect(chartKeys).toContain(chart3.key);
  expect(chartKeys).toContain(chart4.key);
});
