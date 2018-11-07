test('should publish a chart', async () => {
    let chart = await client.charts.create('oldName');
    await client.events.create(chart.key);
    await client.charts.update(chart.key, 'newName');

    await client.charts.publishDraftVersion(chart.key);
    let retrievedChart = await client.charts.retrieve(chart.key);

    expect(retrievedChart.status).toBe('PUBLISHED');
    expect(retrievedChart.name).toBe('newName');
});
