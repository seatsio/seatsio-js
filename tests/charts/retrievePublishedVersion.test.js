const testUtils = require('../testUtils.js')

test('should retrieve published version of a chart', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)

    expect(retrievedChart.name).toEqual('Untitled chart')
    expect(retrievedChart.venueType).toEqual('MIXED')
    expect(retrievedChart.categories.list).toEqual([])
    expect(retrievedChart.subChart).toBeTruthy()
})
