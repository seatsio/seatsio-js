// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should retrieve published version of a chart', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.name).toEqual('Untitled chart')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.venueType).toEqual('MIXED')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.categories.list).toEqual([])
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.subChart).toBeTruthy()
})
