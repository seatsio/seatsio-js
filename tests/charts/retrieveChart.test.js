const testUtils = require('../testUtils.js');

test('should retrieve chart', async ()=> {
  const user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create();
  await client.charts.addTag(chart.key, 'tag1');
  var retrievedChart = await client.charts.retrieve(chart.key);
  expect(retrievedChart.key).toBe(chart.key);
  expect(retrievedChart.id).not.toBeNull();
  expect(retrievedChart.id).toBeDefined();
  expect(retrievedChart.name).toBe('Untitled chart');
  expect(retrievedChart.status).toBe('NOT_USED');
  expect(retrievedChart.publishedVersionThumbnailUrl).not.toBeNull();
  expect(retrievedChart.publishedVersionThumbnailUrl).toBeDefined();
  expect(retrievedChart.draftVersionThumbnailUrl).toBeUndefined();
  expect(retrievedChart.tags).toEqual(['tag1']);
  expect(retrievedChart.archived).toBeFalsy();
  expect(retrievedChart.events).toBeUndefined();
  expect(retrievedChart.events).toBeFalsy();
});


test('should retrieve chart with events', async ()=> {
  const user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create();
  var event1 = await client.events.create(chart.key);
  var event2 = await client.events.create(chart.key);
  var retrievedChart = await client.charts.retrieveWithEvents(chart.key);
  var retrievedChartEventIds = [retrievedChart.events[0].id, retrievedChart.events[1].id];
  expect(retrievedChartEventIds).toContain(event1.id);
  expect(retrievedChartEventIds).toContain(event2.id);
  expect(retrievedChart.events.length).toBe(2);
});
