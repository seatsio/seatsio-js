test('should update chart name', async () => {
    let categories = [{ 'key': 1, 'label': 'Category 1', 'color': '#aaaaaa', 'accessible': false }]
    let chart = await client.charts.create(null, null, categories)

    await client.charts.update(chart.key, 'aChart')

    let retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    expect(retrievedChart.name).toBe('aChart')
    expect(retrievedChart.categories.list).toEqual(categories)
})

test('should update chart categories', async () => {
    let chart = await client.charts.create('aChart')
    let categories = [{ 'key': 1, 'label': 'Category 1', 'color': '#aaaaaa', 'accessible': false }, { 'key': 2, 'label': 'Category 2', 'color': '#bbbbbb', 'accessible': true }]

    await client.charts.update(chart.key, null, categories)

    let retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    expect(retrievedChart.name).toBe('aChart')
    expect(retrievedChart.categories.list).toEqual(categories)
})
