import { TestUtils } from '../testUtils'
import { SeasonParams } from '../../src/Seasons/SeasonParams'
import { Event } from '../../src/Events/Event'

test('add events to partial season', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key, new SeasonParams().eventKeys(['event1', 'event2']))
    const partialSeason = await client.seasons.createPartialSeason(season.key)

    const updatedPartialSeason = await client.seasons.addEventsToPartialSeason(season.key, partialSeason.key, ['event1', 'event2'])

    expect(updatedPartialSeason.events!.map((e: Event) => e.key)).toEqual(['event1', 'event2'])
})
