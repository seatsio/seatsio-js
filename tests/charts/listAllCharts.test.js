const testUtils = require('../testUtils.js');
const ChartListParams = require('../../src/Charts/ChartListParams.js');

test('should list all charts', async () => {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart1 = await client.charts.create('Chart1');
  var chart2 = await client.charts.create('Chart2');
  var chart3 = await client.charts.create('Chart3');
  var chart4 = await client.charts.create('Chart4');
  var page = await client.charts.listAll();
  var chartKeys = [];
  for(let chart of page){
    chartKeys.push(chart.key);
  }

  expect(chartKeys).toContain(chart1.key);
  expect(chartKeys).toContain(chart2.key);
  expect(chartKeys).toContain(chart3.key);
  expect(chartKeys).toContain(chart4.key);

});


test('what happens when there are no charts with listAll', async () => {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);

  var page = await client.charts.listAll();
  expect(page.items.length).toBe(0);
});

test('listAll charts with filter parameter', async () => {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart1 = await client.charts.create('foo');
  var chart2 = await client.charts.create('bar');
  var chart3 = await client.charts.create('foofoo');
  var params = new ChartListParams().withFilter('foo');
  var page = await client.charts.listAll(params);
  var chartKeys = [];
  for(let chart of page){
    chartKeys.push(chart.key);
  }

  expect(chartKeys).toContain(chart1.key);
  expect(chartKeys).not.toContain(chart2.key);
  expect(chartKeys).toContain(chart3.key);
});

test('listAll charts with tag parameter', async () => {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart1 = await client.charts.create();
  var chart2 = await client.charts.create();
  var chart3 = await client.charts.create();
  await client.charts.addTag(chart1.key, 'foo');
  await client.charts.addTag(chart3.key, 'foo');
  var params = new ChartListParams().withTag('foo');
  var page = await client.charts.listAll(params);
  var chartKeys = [];
  for(let chart of page){
    chartKeys.push(chart.key);
  }

  expect(chartKeys).toContain(chart1.key);
  expect(chartKeys).not.toContain(chart2.key);
  expect(chartKeys).toContain(chart3.key);
});

test('listAll charts with tag and filter parameters', async () => {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart1 = await client.charts.create('bar');
  var chart2 = await client.charts.create();
  var chart3 = await client.charts.create('bar');
  var chart4 = await client.charts.create('bar');
  await client.charts.addTag(chart1.key, 'foo');
  await client.charts.addTag(chart2.key, 'foo');
  await client.charts.addTag(chart3.key, 'foo');
  var params = new ChartListParams().withFilter('bar').withTag('foo');
  var page = await client.charts.listAll(params);
  var chartKeys = [];
  for(let chart of page){
    chartKeys.push(chart.key);
  }

  expect(chartKeys).toContain(chart1.key);
  expect(chartKeys).not.toContain(chart2.key);
  expect(chartKeys).toContain(chart3.key);
  expect(chartKeys).not.toContain(chart4.key);
});

/* This test fails
test('listAll charts with expandEvents parameters', async () => {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create();
  var event1 = await client.events.create(chart.key);
  var event2 = await client.events.create(chart.key);
  var params = new ChartListParams().withExpandEvents(true);
  var page = await client.charts.listAll(params);
  //console.log(page);

  var eventKeys = [];
  for(let chart of page){
    eventKeys.push(chart.events.key);
  }

  expect(eventKeys).toContain(event1.key);
  expect(eventKeys).toContain(event2.key);
});
*/
