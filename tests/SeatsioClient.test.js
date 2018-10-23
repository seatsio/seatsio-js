const SeatsioClient = require('../src/SeatsioClient.js'),
      axios = require('axios'),
      uuidv1 = require('uuid/v1'),
      uuidv4 = require('uuid/v4'),
      fs = require('fs');

function createTestUser(){
  var baseUrl = 'https://api-staging.seatsio.net/';
  var userPromise = axios({
    method: 'POST',
    url: baseUrl + 'system/public/users/actions/create-test-user'
  }).then( (res) => res.data);
  return userPromise;
}

function createSeatsioClient(secretKey, url){
    var client = new SeatsioClient(secretKey, url);
    return client
}

function createTestChartFromFile(file, designerKey, chartKey, secretKey){
  var requestBody = fs.readFileSync(file);
  var chartReq = axios.create();
  var url = `https://api-staging.seatsio.net/system/public/${designerKey}/charts/${chartKey}`;
  var chartPromise = chartReq.post(url, requestBody);
  return chartPromise;
}

test('should create a test chart from file', async () => {
  var user = await createTestUser();
  var client = createSeatsioClient(user.secretKey, 'https://api-staging.seatsio.net/');
  var chartKey = uuidv4();
  var chart = await createTestChartFromFile(__dirname + '/sampleChart.json',
                                  user.designerKey, chartKey, user.secretKey);
  var retrievedChart = await client.charts.retrieve(chartKey);
  
  expect(retrievedChart.id).toBeDefined();
  expect(retrievedChart.key).toBeDefined();
  expect(retrievedChart.key).toBeTruthy();
  expect(retrievedChart.publishedVersionThumbnailUrl).toBeDefined();
});

test('should create a test chart with tables from file', async () => {
  var user = await createTestUser();
  var client = createSeatsioClient(user.secretKey, 'https://api-staging.seatsio.net/');
  var chartKey = uuidv4();
  var chart = await createTestChartFromFile(__dirname + '/sampleChartWithTables.json',
                                  user.designerKey, chartKey, user.secretKey);
  var retrievedChart = await client.charts.retrieve(chartKey);

  expect(retrievedChart.id).toBeDefined();
  expect(retrievedChart.key).toBeDefined();
  expect(retrievedChart.key).toBeTruthy();
  expect(retrievedChart.publishedVersionThumbnailUrl).toBeDefined();
});

test('should create a test chart with sections from file', async () => {
  var user = await createTestUser();
  var client = createSeatsioClient(user.secretKey, 'https://api-staging.seatsio.net/');
  var chartKey = uuidv4();
  var chart = await createTestChartFromFile(__dirname + '/sampleChartWithSections.json',
                                  user.designerKey, chartKey, user.secretKey);
  var retrievedChart = await client.charts.retrieve(chartKey);

  expect(retrievedChart.id).toBeDefined();
  expect(retrievedChart.key).toBeDefined();
  expect(retrievedChart.key).toBeTruthy();
  expect(retrievedChart.publishedVersionThumbnailUrl).toBeDefined();
});
