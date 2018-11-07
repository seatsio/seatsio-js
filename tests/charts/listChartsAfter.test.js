const testUtils = require('../testUtils.js');
const ChartListParams = require('../../src/Charts/ChartListParams.js');

test('should list charts after a given chart id', async () => {
    var chart1 = await client.charts.create();
    var chart2 = await client.charts.create();
    var chart3 = await client.charts.create();
    var page = await client.charts.listPageAfter(chart3.id);
    var chartKeys = page.items.map((chart) => chart.key);

    expect(chartKeys).toContain(chart1.key)
    expect(chartKeys).toContain(chart2.key)
    expect(chartKeys).not.toContain(chart3.key);
});

test('should list charts after a given chart id with filter', async () => {
    var chart1 = await client.charts.create('foo');
    var chart2 = await client.charts.create('bar');
    var chart3 = await client.charts.create('foo');
    var chart4 = await client.charts.create('foo');
    var params = new ChartListParams().withFilter('foo');
    var page = await client.charts.listPageAfter(chart4.id, params);
    var chartKeys = page.items.map((chart) => chart.key);

    expect(chartKeys).toContain(chart1.key)
    expect(chartKeys).not.toContain(chart2.key)
    expect(chartKeys).toContain(chart3.key);
    expect(chartKeys).not.toContain(chart4.key);
});

test('should list charts after a given chart id with page size', async () => {
    var chart1 = await client.charts.create();
    var chart2 = await client.charts.create();
    var chart3 = await client.charts.create();
    var chart4 = await client.charts.create();
    var params = new ChartListParams().withFilter();
    var page = await client.charts.listPageAfter(chart4.id, null, 2);
    var chartKeys = page.items.map((chart) => chart.key);

    expect(chartKeys).not.toContain(chart1.key)
    expect(chartKeys).toContain(chart2.key)
    expect(chartKeys).toContain(chart3.key);
    expect(chartKeys).not.toContain(chart4.key);
});
