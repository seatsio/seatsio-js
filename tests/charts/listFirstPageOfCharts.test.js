const ChartListParams = require('../../src/Charts/ChartListParams.js')

test('should list first page of charts', async () => {
    let chart1 = await client.charts.create();
    let chart2 = await client.charts.create();
    let chart3 = await client.charts.create();

    let page = await client.charts.listFirstPage();
    let chartKeys = page.items.map((chart) => chart.key);

    expect(chartKeys.sort()).toEqual([chart1.key, chart2.key, chart3.key].sort());
});


test('should list first page of charts with filter', async () => {
    let chart1 = await client.charts.create('foo');
    let chart2 = await client.charts.create('foo');
    await client.charts.create('bar');
    let chart4 = await client.charts.create('foo');
    let params = new ChartListParams().withFilter('foo');

    let page = await client.charts.listFirstPage(params);
    let chartKeys = page.items.map((chart) => chart.key);

    expect(chartKeys.sort()).toEqual([chart1.key, chart2.key, chart4.key].sort());
});

test('pageSize of list first page of charts with page size', async () => {
    await client.charts.create('foo');
    await client.charts.create('foo');
    let chart3 = await client.charts.create('bar');
    let chart4 = await client.charts.create('foo');

    let page = await client.charts.listFirstPage(null, 2);
    let chartKeys = page.items.map((chart) => chart.key);

    expect(chartKeys.sort()).toEqual([chart3.key, chart4.key].sort());
});
