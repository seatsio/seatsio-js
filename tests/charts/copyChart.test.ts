import { TestUtils } from '../testUtils'

test('should copy chart', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create('My Chart', 'BOOTHS')

    const copiedChart = await client.charts.copy(chart.key)

    const retrievedCopiedChart = await client.charts.retrievePublishedVersion(copiedChart.key)
    expect(copiedChart.name).toEqual('My Chart (copy)')
    expect(copiedChart.key).not.toBe(chart.key)
    expect(retrievedCopiedChart.venueType).toEqual('BOOTHS')
})
