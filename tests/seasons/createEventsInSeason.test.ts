import { TestUtils } from '../testUtils'

test('create events in season by event keys', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    const events = await client.seasons.createEvents(season.key, null, ['event1', 'event2'])

    expect(events.map((e: any) => e.key)).toEqual(['event2', 'event1'])
})

test('create events in season by number of events', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    const events = await client.seasons.createEvents(season.key, 2)

    expect(events.length).toBe(2)
})
