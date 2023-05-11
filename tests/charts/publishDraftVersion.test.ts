import { TestUtils } from '../testUtils'

test('should publish a chart', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create('oldName')
    await client.events.create(chart.key)
    await client.charts.update(chart.key, 'newName')

    await client.charts.publishDraftVersion(chart.key)

    const retrievedChart = await client.charts.retrieve(chart.key)
    expect(retrievedChart.status).toBe('PUBLISHED')
    expect(retrievedChart.name).toBe('newName')
})
