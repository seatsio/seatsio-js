const testUtils = require('../testUtils.js');

test('should retrieve thumbnail for the draft version of chart', async ()=> {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create();
  await client.events.create(chart.key);
  await client.charts.update(chart.key, 'newName');
  var thumbnail = await client.charts.retrieveDraftVersionThumbnail(chart.key);
  expect(thumbnail).toContain('<!DOCTYPE svg');
});
