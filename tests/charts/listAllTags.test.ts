// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should retrieve all tags of all charts', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    await client.charts.addTag(chart1.key, 'tag1')
    await client.charts.addTag(chart2.key, 'tag2')

    const allTags = await client.charts.listAllTags()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(allTags.sort()).toEqual(['tag1', 'tag2'])
})
