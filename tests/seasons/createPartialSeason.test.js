const testUtils = require('../testUtils.js')
const SeasonParams = require('../../src/Seasons/SeasonParams')

test('key can be passed in', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    const partialSeason = await client.seasons.createPartialSeason(season.key, 'aPartialSeason')

    expect(partialSeason.key).toBe('aPartialSeason')
})

test('event keys can be passed in', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key, new SeasonParams().eventKeys(['event1', 'event2']))

    const partialSeason = await client.seasons.createPartialSeason(season.key, null, ['event1', 'event2'])

    expect(partialSeason.events.map(event => event.key)).toEqual(['event1', 'event2'])
})
