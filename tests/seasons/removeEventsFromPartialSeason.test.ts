import { TestUtils } from '../testUtils'
import { SeasonParams } from '../../src/Seasons/SeasonParams'

test('add events to partial season', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key, new SeasonParams().eventKeys(['event1', 'event2']))
    const partialSeason = await client.seasons.createPartialSeason(season.key, null, ['event1', 'event2'])

    const updatedPartialSeason = await client.seasons.removeEventFromPartialSeason(season.key, partialSeason.key, 'event2')

    expect(updatedPartialSeason.events.map((e: any) => e.key)).toEqual(['event1'])
})
