import { TestUtils } from '../testUtils'

test('should discard draft version of the chart', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create('oldName')
    await client.events.create(chart.key)
    await client.charts.update(chart.key, 'newName')

    await client.charts.discardDraftVersion(chart.key)

    const retrievedChart = await client.charts.retrieve(chart.key)
    expect(retrievedChart.status).toEqual('PUBLISHED')
    expect(retrievedChart.name).toEqual('oldName')
})
