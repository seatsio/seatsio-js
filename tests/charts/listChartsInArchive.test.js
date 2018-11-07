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

    var chartsInArchivePage = client.charts.archive;
    var archivedChartKeys = [];
    for await(chartPage of chartsInArchivePage) {
        for (let chart of chartPage) {
            archivedChartKeys.push(chart.key);
        }
    }

    expect(archivedChartKeys).toContain(chart1.key);
    expect(archivedChartKeys).toContain(chart2.key);
    expect(archivedChartKeys).not.toContain(chart3.key);
});

test('get archived charts (above 100 limit)', async () => {
    jest.setTimeout(100000);
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var archivedKeys = [];
    for (var i = 0; i < 120; i++) {
        var chart = await client.charts.create();
        await client.charts.moveToArchive(chart.key);
        archivedKeys.push(chart.key);
    }

    var chartsInArchivePage = client.charts.archive;
    var archivedChartKeys = [];
    for await(chartPage of chartsInArchivePage) {
        for (let chart of chartPage) {
            archivedChartKeys.push(chart.key);
        }
    }

    expect(archivedChartKeys.length).toBe(120);
});
