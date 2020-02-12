const testUtils = require('../testUtils.js')

test('should update chart name', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const categories = [{ key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false }]
    const chart = await client.charts.create(null, null, categories)

    await client.charts.update(chart.key, 'aChart')

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    expect(retrievedChart.name).toBe('aChart')
    expect(retrievedChart.categories.list).toEqual(categories)
})

test('should update chart categories', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create('aChart')
    const categories = [{ key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false }, { key: 2, label: 'Category 2', color: '#bbbbbb', accessible: true }]

    await client.charts.update(chart.key, null, categories)

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    expect(retrievedChart.name).toBe('aChart')
    expect(retrievedChart.categories.list).toEqual(categories)
})
