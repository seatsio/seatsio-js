test('should copy chart', async () => {
    let chart = await client.charts.create('My Chart', 'BOOTHS');

    let copiedChart = await client.charts.copy(chart.key);

    let retrievedCopiedChart = await client.charts.retrievePublishedVersion(copiedChart.key);
    expect(copiedChart.name).toEqual('My Chart (copy)');
    expect(copiedChart.key).not.toBe(chart.key);
    expect(retrievedCopiedChart.venueType).toEqual('BOOTHS');
});
