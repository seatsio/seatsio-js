// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'
import { SeasonParams } from '../../src/Seasons/SeasonParams'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('key can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    const partialSeason = await client.seasons.createPartialSeason(season.key, 'aPartialSeason')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(partialSeason.key).toBe('aPartialSeason')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('event keys can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key, new SeasonParams().eventKeys(['event1', 'event2']))

    const partialSeason = await client.seasons.createPartialSeason(season.key, null, ['event1', 'event2'])

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(partialSeason.events.map((event: any) => event.key)).toEqual(['event1', 'event2'])
})
