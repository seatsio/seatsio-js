import { TestUtils } from '../testUtils'

test('should copy draft version of a chart', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create('oldName')
    await client.events.create(chart.key)
    await client.charts.update(chart.key, 'newName')

    const copiedChart = await client.charts.copyDraftVersion(chart.key)

    expect(copiedChart.name).toEqual('newName (copy)')
    expect(chart.key).not.toBe(copiedChart.key)
})
