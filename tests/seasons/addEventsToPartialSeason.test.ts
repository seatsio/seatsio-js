// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'
import { SeasonParams } from '../../src/Seasons/SeasonParams'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('add events to partial season', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key, new SeasonParams().eventKeys(['event1', 'event2']))
    const partialSeason = await client.seasons.createPartialSeason(season.key)

    const updatedPartialSeason = await client.seasons.addEventsToPartialSeason(season.key, partialSeason.key, ['event1', 'event2'])

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(updatedPartialSeason.events.map((e: any) => e.key)).toEqual(['event1', 'event2'])
})
