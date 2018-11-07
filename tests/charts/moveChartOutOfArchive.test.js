test('should move chart out of archive', async () => {
    let chart = await client.charts.create();
    await client.charts.moveToArchive(chart.key);
    await client.charts.moveOutOfArchive(chart.key);
    let retrievedChartKeys = [];

    for await(let chart of client.charts.archive){
        retrievedChartKeys.push(chart.key)
    }

    expect(retrievedChartKeys).toEqual([]);
});
