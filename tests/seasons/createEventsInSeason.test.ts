// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('create events in season by event keys', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    const events = await client.seasons.createEvents(season.key, null, ['event1', 'event2'])

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(events.map((e: any) => e.key)).toEqual(['event2', 'event1'])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('create events in season by number of events', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    const events = await client.seasons.createEvents(season.key, 2)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(events.length).toBe(2)
})
