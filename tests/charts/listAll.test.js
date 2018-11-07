const testUtils = require('../testUtils.js');
const ChartListParams = require('../../src/Charts/ChartListParams.js');

test('listAll when there are more than 20 charts', async () => {
    jest.setTimeout(20000);
    var generatedChartKeys = [];
    for (var i = 0; i < 45; i++) {
        var chart = await client.charts.create(i.toString());
        generatedChartKeys.push(chart.key);
    }
    var charts = client.charts.listAll();
    var retrievedKeys = [];

    for await (const chart of charts) {
        retrievedKeys.push(chart.key);
    }

    expect(retrievedKeys.length).toBe(45);
    expect(retrievedKeys.sort()).toEqual(generatedChartKeys.sort());
});
