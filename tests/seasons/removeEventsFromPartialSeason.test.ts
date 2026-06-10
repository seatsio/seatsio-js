import { TestUtils } from '../testUtils.js'
import { CreateSeasonParams } from '../../src/Seasons/CreateSeasonParams.js'
import { Event } from '../../src/Events/Event.js'

test('add events to partial season', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key, new CreateSeasonParams().eventKeys(['event1', 'event2']))
    const partialSeason = await client.seasons.createPartialSeason(season.key, null, null, ['event1', 'event2'])

    const updatedPartialSeason = await client.seasons.removeEventFromPartialSeason(season.key, partialSeason.key, 'event2')

    expect(updatedPartialSeason.events!.map((e: Event) => e.key)).toEqual(['event1'])
})
