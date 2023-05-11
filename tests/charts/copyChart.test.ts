// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should copy chart', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create('My Chart', 'BOOTHS')

    const copiedChart = await client.charts.copy(chart.key)

    const retrievedCopiedChart = await client.charts.retrievePublishedVersion(copiedChart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(copiedChart.name).toEqual('My Chart (copy)')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(copiedChart.key).not.toBe(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedCopiedChart.venueType).toEqual('BOOTHS')
})
