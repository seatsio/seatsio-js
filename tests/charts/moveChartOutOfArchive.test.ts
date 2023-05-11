// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should move chart out of archive', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.charts.moveToArchive(chart.key)
    const retrievedChartKeys = []

    await client.charts.moveOutOfArchive(chart.key)

    for await (const chart of client.charts.archive.all()) {
        retrievedChartKeys.push(chart.key)
    }
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChartKeys).toEqual([])
})
