import { TestUtils } from '../testUtils'

test('should move an event to a new chart copy', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    const updatedEvent = await client.events.moveEventToChartCopy(event.key)

    expect(updatedEvent.key).toBeTruthy()
    expect(updatedEvent.chartKey).not.toBe(event.chartKey)
})
