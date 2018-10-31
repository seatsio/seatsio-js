const testUtils = require('../testUtils.js');
const ChartListParams = require('../../src/Charts/ChartListParams.js');


test('should list charts in archive', async () => {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);

  var chart1 = await client.charts.create();
  var chart2 = await client.charts.create();
  var chart3 = await client.charts.create();

  await client.charts.moveToArchive(chart1.key);
  await client.charts.moveToArchive(chart2.key);

  var chartsInArchivePage = await client.charts.archive.all();
  var archivedChartKeys = [];
  for (chart of chartsInArchivePage){
    archivedChartKeys.push(chart.key);
  }

  expect(archivedChartKeys).toContain(chart1.key);
  expect(archivedChartKeys).toContain(chart2.key);
  expect(archivedChartKeys).not.toContain(chart3.key);
});
