// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should remove tag', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.charts.addTag(chart.key, 'tag1')
    await client.charts.addTag(chart.key, 'tag2')

    await client.charts.removeTag(chart.key, 'tag1')

    const retrievedChart = await client.charts.retrieve(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.tags).toEqual(['tag2'])
})
