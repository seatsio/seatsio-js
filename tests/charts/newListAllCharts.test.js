test('listAll charts in a paginated way', async () => {
    jest.setTimeout(25000);
    let generatedChartKeys = [], retrievedKeys = [];
    for (let i = 0; i < 25; i++) {
        let chart = await client.charts.create(i.toString());
        generatedChartKeys.push(chart.key);
    }


    for await (const chart of client.charts.listAll()) {
        retrievedKeys.push(chart.key);
        //console.log(chart);
    }

    expect(retrievedKeys.sort()).toEqual(generatedChartKeys.sort());
/*
    let chartPages = client.charts.listAllV2();
    let chartPagesIt = chartPages[Symbol.asyncIterator]();
    await chartPagesIt.next();
    console.log(chartPages.pages);
*/
});