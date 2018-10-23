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

test('should add tag', async ()=> {
  const user = await createTestUser();
  var client = createClient(user.secretKey, 'https://api-staging.seatsio.net/');
  var chart = await client.charts.create();
  await client.charts.addTag(chart.key, 'async');
  var retrievedChart = await client.charts.retrieve(chart.key);
  expect(retrievedChart.key).toBe(chart.key);
  expect(retrievedChart.id).not.toBeNull();
  expect(retrievedChart.name).toBe('Untitled chart');
  expect(retrievedChart.status).toBe('NOT_USED');
  expect(retrievedChart.publishedVersionThumbnailUrl).not.toBeNull();
  expect(retrievedChart.draftVersionThumbnailUrl).not.toBeNull();
  expect(retrievedChart.archived).toBeFalsy();
  expect(retrievedChart.events).toBeUndefined();
});
