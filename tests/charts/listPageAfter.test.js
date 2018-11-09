const ChartListParams = require('../../src/Charts/ChartListParams.js');

test('should list charts after a given chart id', async () => {
    let chart1 = await client.charts.create();
    let chart2 = await client.charts.create();
    let chart3 = await client.charts.create();

    let page = await client.charts.listPageAfter(chart3.id);
    let chartKeys = page.items.map((chart) => chart.key);

    expect(chartKeys.sort()).toEqual([chart1.key, chart2.key].sort());
});

test('should list charts after a given chart id with filter', async () => {
    let chart1 = await client.charts.create('foo');
    await client.charts.create('bar');
    let chart3 = await client.charts.create('foo');
    let chart4 = await client.charts.create('foo');
    let params = new ChartListParams().withFilter('foo');

    let page = await client.charts.listPageAfter(chart4.id, params);
    let chartKeys = page.items.map((chart) => chart.key);

    expect(chartKeys.sort()).toEqual([chart1.key, chart3.key].sort());
});

test('should list charts after a given chart id with page size', async () => {
    await client.charts.create();
    let chart2 = await client.charts.create();
    let chart3 = await client.charts.create();
    let chart4 = await client.charts.create();

    let page = await client.charts.listPageAfter(chart4.id, null, 2);
    let chartKeys = page.items.map((chart) => chart.key);

    expect(chartKeys.sort()).toEqual([chart2.key, chart3.key].sort());
});
