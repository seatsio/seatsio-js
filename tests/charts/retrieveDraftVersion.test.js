import { TestUtils } from '../testUtils'

test('should retrieve draft version of a chart', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.events.create(chart.key)
    await client.charts.update(chart.key, 'New name')

    const retrievedChart = await client.charts.retrieveDraftVersion(chart.key)

    expect(retrievedChart.name).toBe('New name')
})
