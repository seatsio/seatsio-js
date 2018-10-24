const testUtils = require('../testUtils.js');

test('should retrieve thumbnail for the published version of chart', async ()=> {
  const user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create();
  var thumbnail = await client.charts.retrievePublishedVersionThumbnail(chart.key);
  expect(thumbnail).toContain('<!DOCTYPE svg');
});
