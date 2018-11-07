const testUtils = require('../testUtils.js');
const ChartListParams = require('../../src/Charts/ChartListParams.js');

test('getAll Charts with more than 20 charts', async () => {
    jest.setTimeout(20000);
    let generatedChartKeys = [];
    for (let i = 0; i < 22; i++) {
        let chart = await client.charts.create();
        generatedChartKeys.push(chart.key);
    }
    let chartPages = client.charts.getAll();
    let retrievedKeys = [];

    for await (const page of chartPages) {
        for (const chart of page) {
            retrievedKeys.push(chart.key);
        }
    }

    expect(retrievedKeys.length).toBe(22);
    expect(retrievedKeys.sort()).toEqual(generatedChartKeys.sort());
});

test('getAll Charts with more than 40 charts', async () => {
    jest.setTimeout(20000);
    var generatedChartKeys = [];
    for (var i = 0; i < 46; i++) {
        var chart = await client.charts.create();
        generatedChartKeys.push(chart.key);
    }
    var chartPages = client.charts.getAll();
    var retrievedKeys = [];

    for await (const page of chartPages) {
        for (const chart of page) {
            retrievedKeys.push(chart.key);
        }
    }

    expect(retrievedKeys.length).toBe(46);
    expect(retrievedKeys.sort()).toEqual(generatedChartKeys.sort());
});

test('getAll Charts when there are no charts', async () => {
    var chartPages = client.charts.getAll();
    var keys = [];
    for await(const page of chartPages) {
        for (const chart of page) {
            keys.push(chart.key);
        }
    }
    expect(keys.length).toBe(0);
});

test('getAll Charts with filter', async () => {
    var fooChartKeys = [];
    for (var i = 0; i < 21; i++) {
        var chart = await client.charts.create('foo');
        fooChartKeys.push(chart.key);
    }
    var barChart = await client.charts.create('bar');
    var params = new ChartListParams().withFilter('foo');
    var chartPages = client.charts.getAll(params);
    var retrievedChartKeys = [];

    for await(const page of chartPages) {
        for (const chart of page) {
            retrievedChartKeys.push(chart.key);
        }
    }

    expect(retrievedChartKeys.length).toBe(21);
    expect(retrievedChartKeys.sort()).toEqual(fooChartKeys.sort());
    expect(retrievedChartKeys).not.toContain(barChart.key);
});

test('getAll Charts with tag', async () => {
    jest.setTimeout(20000);
    var fooChartKeys = [];
    for (var i = 0; i < 21; i++) {
        var chart = await client.charts.create();
        await client.charts.addTag(chart.key, 'foo')
        fooChartKeys.push(chart.key);
    }
    var barChart = await client.charts.create('bar');
    var params = new ChartListParams().withTag('foo');
    var chartPages = client.charts.getAll(params);
    var retrievedChartKeys = [];

    for await(const page of chartPages) {
        for (const chart of page) {
            retrievedChartKeys.push(chart.key);
        }
    }

    expect(retrievedChartKeys.length).toBe(21);
    expect(retrievedChartKeys.sort()).toEqual(fooChartKeys.sort());
    expect(retrievedChartKeys).not.toContain(barChart.key);
});

test('getAll Charts with tag and filter parameters', async () => {
    var chart1 = await client.charts.create('bar');
    var chart2 = await client.charts.create();
    var chart3 = await client.charts.create('bar');
    var chart4 = await client.charts.create('bar');
    await client.charts.addTag(chart1.key, 'foo');
    await client.charts.addTag(chart2.key, 'foo');
    await client.charts.addTag(chart3.key, 'foo');
    var params = new ChartListParams().withFilter('bar').withTag('foo');
    var chartPages = await client.charts.getAll(params);
    var chartKeys = [];
    for await(const page of chartPages) {
        for (const chart of page) {
            chartKeys.push(chart.key);
        }
    }

    expect(chartKeys).toContain(chart1.key);
    expect(chartKeys).not.toContain(chart2.key);
    expect(chartKeys).toContain(chart3.key);
    expect(chartKeys).not.toContain(chart4.key);
});

test('getAll Charts with expandEvents parameters', async () => {
    var chart1 = await client.charts.create();
    var chart2 = await client.charts.create();
    var event1 = await client.events.create(chart1.key);
    var event2 = await client.events.create(chart1.key);
    var event3 = await client.events.create(chart2.key);
    var event4 = await client.events.create(chart2.key);
    var generatedEventKeys = [event1.key, event2.key, event3.key, event4.key]
    var params = new ChartListParams().withExpandEvents(true);
    var chartPages = await client.charts.getAll(params);
    var eventKeys = [];
    for await(const page of chartPages) {
        for (const chart of page) {
            eventKeys.push(chart.events[0].key);
            eventKeys.push(chart.events[1].key);
        }
    }

    expect(eventKeys.sort()).toEqual(generatedEventKeys.sort());
});
