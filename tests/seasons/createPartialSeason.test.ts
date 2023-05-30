import { TestUtils } from '../testUtils'
import { SeasonParams } from '../../src/Seasons/SeasonParams'
import { Event } from '../../src/Events/Event'

test('key can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    const partialSeason = await client.seasons.createPartialSeason(season.key, 'aPartialSeason')

    expect(partialSeason.key).toBe('aPartialSeason')
})

test('event keys can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key, new SeasonParams().eventKeys(['event1', 'event2']))

    const partialSeason = await client.seasons.createPartialSeason(season.key, null, ['event1', 'event2'])

    expect(partialSeason.events!.map((event: Event) => event.key)).toEqual(['event1', 'event2'])
})
