test('should retrieve draft version of a chart', async () => {
    let chart = await client.charts.create()
    await client.events.create(chart.key)
    await client.charts.update(chart.key, 'New name')

    let retrievedChart = await client.charts.retrieveDraftVersion(chart.key)

    expect(retrievedChart.name).toBe('New name')
})
