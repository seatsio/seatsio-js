// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should retrieve draft version of a chart', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.events.create(chart.key)
    await client.charts.update(chart.key, 'New name')

    const retrievedChart = await client.charts.retrieveDraftVersion(chart.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.name).toBe('New name')
})
