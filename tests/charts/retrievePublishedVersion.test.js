test('should retrieve published version of a chart', async () => {
    let chart = await client.charts.create();

    let retrievedChart = await client.charts.retrievePublishedVersion(chart.key);

    expect(retrievedChart.name).toEqual('Untitled chart');
    expect(retrievedChart.venueType).toEqual('MIXED');
    expect(retrievedChart.categories.list).toEqual([]);
    expect(retrievedChart.subChart).toBeTruthy();
});
