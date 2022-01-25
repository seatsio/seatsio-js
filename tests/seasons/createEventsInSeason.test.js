const testUtils = require('../testUtils.js')

test('create events in season by event keys', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    const updatedSeason = await client.seasons.createEvents(season.key, null, ['event1', 'event2'])

    expect(updatedSeason.events.map(e => e.key)).toEqual(['event1', 'event2'])
})

test('create events in season by number of events', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    const updatedSeason = await client.seasons.createEvents(season.key, 2)

    expect(updatedSeason.events.length).toBe(2)
})
