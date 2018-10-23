const SeatsioClient = require('../../src/SeatsioClient.js');
const axios = require('axios');
const clientFunctions = require('./setUpClient.js');

test('should add tag', async ()=> {
  const user = await clientFunctions.createTestUser();;
  var client = clientFunctions.createClient(user.secretKey, 'https://api-staging.seatsio.net/');
  var chart = await client.charts.create();
  await client.charts.addTag(chart.key, 'tag1');
  var retrievedChart = await client.charts.retrieve(chart.key);
  expect(retrievedChart.key).toBe(chart.key);
  expect(retrievedChart.tags).toEqual(['tag1']);
});

test('should be able to add a tag with special characters', async ()=> {
  const user = await clientFunctions.createTestUser();
  var client = clientFunctions.createClient(user.secretKey, 'https://api-staging.seatsio.net/');
  var chart = await client.charts.create();
  await client.charts.addTag(chart.key, 'tag1/:"-<>');
  var retrievedChart = await client.charts.retrieve(chart.key);
  expect(retrievedChart.tags).toEqual(['tag1/:"-<>']);
});
