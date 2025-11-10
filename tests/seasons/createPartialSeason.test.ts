import { TestUtils } from '../testUtils'
import { CreateSeasonParams } from '../../src/Seasons/CreateSeasonParams'
import { Event } from '../../src/Events/Event'

test('key can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    const partialSeason = await client.seasons.createPartialSeason(season.key, 'aPartialSeason')

    expect(partialSeason.key).toBe('aPartialSeason')
})

test('name can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    const partialSeason = await client.seasons.createPartialSeason(season.key, null, 'aPartialSeason')

    expect(partialSeason.name).toBe('aPartialSeason')
})

test('event keys can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key, new CreateSeasonParams().eventKeys(['event1', 'event2']))

    const partialSeason = await client.seasons.createPartialSeason(season.key, null, null, ['event1', 'event2'])

    expect(partialSeason.events!.map((event: Event) => event.key)).toEqual(['event1', 'event2'])
    expect(partialSeason.events![0].partialSeasonKeysForEvent).toEqual([partialSeason.key])
})
