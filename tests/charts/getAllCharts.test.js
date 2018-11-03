const testUtils = require('../testUtils.js');

test('getAll with more than 20 charts', async () => {
  jest.setTimeout(20000);
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var generatedChartKeys = [];
  for(var i = 0; i < 22; i++){
    var chart = await client.charts.create();
    generatedChartKeys.push(chart.key);
  }
  var chartPages = client.charts.getAll();
  var retrievedKeys = [];

  for await (const page of chartPages){
    for(const chart of page){
      retrievedKeys.push(chart.key);
    }
  }

  expect(retrievedKeys.length).toBe(22);
  expect(retrievedKeys.sort()).toEqual(generatedChartKeys.sort());
});

test('getAll with more than 40 charts', async () => {
  jest.setTimeout(20000);
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var generatedChartKeys = [];
  for(var i = 0; i < 46; i++){
    var chart = await client.charts.create();
    generatedChartKeys.push(chart.key);
  }
  var chartPages = client.charts.getAll();
  var retrievedKeys = [];

  for await (const page of chartPages){
    for(const chart of page){
      retrievedKeys.push(chart.key);
    }
  }

  expect(retrievedKeys.length).toBe(46);
  expect(retrievedKeys.sort()).toEqual(generatedChartKeys.sort());
});

test('getAll with no charts', async () => {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);

  var chartPages = client.charts.getAll();
  var keys = [];
  for await(const page of chartPages){
    for(const chart of page){
      keys.push(chart.key);
    }
  }
  expect(keys.length).toBe(0);
});
