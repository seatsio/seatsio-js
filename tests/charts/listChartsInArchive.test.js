test('should list charts in archive', async () => {
    let chart1 = await client.charts.create();
    let chart2 = await client.charts.create();
    await client.charts.create();
    let archivedChartKeys = [];
    await client.charts.moveToArchive(chart1.key);
    await client.charts.moveToArchive(chart2.key);

    for await(let chart of client.charts.archive) {
        archivedChartKeys.push(chart.key);
    }

    expect(archivedChartKeys.sort()).toEqual([chart1.key, chart2.key].sort());
});

test('get archived charts (above 100 limit)', async () => {
    jest.setTimeout(100000);
    let chartKeys = [], archivedChartKeys = [];
    for (let i = 0; i < 120; i++) {
        let chart = await client.charts.create();
        await client.charts.moveToArchive(chart.key);
        chartKeys.push(chart.key);
    }

    for await(let chart of client.charts.archive) {
        archivedChartKeys.push(chart.key);
    }

    expect(archivedChartKeys.sort()).toEqual(chartKeys.sort());
});
