const SeatsioClient = require('../../src/SeatsioClient.js');
const axios = require('axios');

function createTestUser(){
  var baseUrl = 'https://api-staging.seatsio.net/';

  var testUserPr = axios({
    method: 'POST',
    url: baseUrl + 'system/public/users/actions/create-test-user'
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.log(error);
  });

  return testUserPr;
}

function createClient(key, baseUrl){
  return new SeatsioClient(key, baseUrl);
}

test('should create a chart', () => {
  return createTestUser()
  .then( (testUser) => {
    var client = createClient(testUser.secretKey, 'https://api-staging.seatsio.net/');
    return client.charts.create('Empty chart');
  }).then( (chart) => {
    //console.log("In test one");
    //console.log(chart);
    expect(chart.key).toBeDefined();
  });
});

test('should add tag to a chart', () => {
  return createTestUser()
  .then( (testUser) => {
    var client = createClient(testUser.secretKey, 'https://api-staging.seatsio.net/');
    var chartPromise = client.charts.create('Chart with a tag');
    return Promise.all([chartPromise, client]);
  }).then( (res) => {
    var chart = res[0];
    var client = res[1];
    var tagPromise = client.charts.addTag(chart.key, 'tag-1');
    return Promise.all([tagPromise, client, chart]);
  }).then( (res) => {
    var client = res[1];
    var chart = res[2];
    var retrieveChartPromise = client.charts.retrieve(chart.key);
    return Promise.all([client, chart, retrieveChartPromise]);
  }).then( (res) => {
    expect(res[2].tags).toEqual(['tag-1']);
  });
});

test('should retrieve a chart', () => {
  return createTestUser()
  .then( (testUser) => {
    var client = createClient(testUser.secretKey, 'https://api-staging.seatsio.net/');
    var chartPromise = client.charts.create('Chart with a tag');
    return Promise.all([chartPromise, client]);
  }).then( (res) => {
    var chart = res[0];
    var client = res[1];
    var retrieveChartPromise = client.charts.retrieve(chart.key);
    return Promise.all([chart, client, retrieveChartPromise]);
  }).then( (res) => {
    var retrievedChart = res[2];
    expect(retrievedChart.key).toBe(res[0].key);
    expect(retrievedChart.id).not.toBeNull();
    expect(retrievedChart.name).toBe('Chart with a tag');
    expect(retrievedChart.status).toBe('NOT_USED');
    expect(retrievedChart.publishedVersionThumbnailUrl).not.toBeNull();
    expect(retrievedChart.draftVersionThumbnailUrl).not.toBeNull();
    expect(retrievedChart.archived).toBeFalsy();
    expect(retrievedChart.events).toBeUndefined();
  });
});
