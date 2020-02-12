const testUtils = require('../testUtils.js')

test('should move chart out of archive', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.charts.moveToArchive(chart.key)
    const retrievedChartKeys = []

    await client.charts.moveOutOfArchive(chart.key)

    for await (const chart of client.charts.archive.all()) {
        retrievedChartKeys.push(chart.key)
    }
    expect(retrievedChartKeys).toEqual([])
})
