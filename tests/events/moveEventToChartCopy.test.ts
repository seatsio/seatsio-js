import { TestUtils } from '../testUtils.js'

test('should move an event to a new chart copy', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    const updatedEvent = await client.events.moveEventToChartCopy(event.key)

    expect(updatedEvent.key).toBeTruthy()
    expect(updatedEvent.chartKey).not.toBe(event.chartKey)
})

test('should move multiple events to one new chart copy', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event1 = await client.events.create(chart.key)
    const event2 = await client.events.create(chart.key)

    const movedEvents = await client.events.moveEventsToChartCopy([event2.key, event1.key])

    expect(movedEvents.map(event => event.key)).toEqual([event2.key, event1.key])
    expect(movedEvents[0].chartKey).not.toBe(chart.key)
    expect(movedEvents[1].chartKey).toBe(movedEvents[0].chartKey)
})
