const testUtils = require('../testUtils.js');

test('should move chart out of archive', async ()=> {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create();
  await client.charts.moveToArchive(chart.key);
  await client.charts.moveOutOfArchive(chart.key);
  var archivedCharts = await client.charts.archive.all();

  expect(archivedCharts.items.length).toBe(0);
});
