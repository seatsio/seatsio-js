import { TestUtils } from '../testUtils.js'

test('should list all events of a chart, newest first', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const otherChart = await client.charts.create()
    const event1 = await client.events.create(chart.key)
    const event2 = await client.events.create(chart.key)
    const event3 = await client.events.create(chart.key)
    await client.events.create(otherChart.key)

    const eventKeys = []
    for await (const event of client.charts.events(chart.key).all()) {
        eventKeys.push(event.key)
    }

    expect(eventKeys).toEqual([event3.key, event2.key, event1.key])
})

test('should list events of a chart page by page', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event1 = await client.events.create(chart.key)
    const event2 = await client.events.create(chart.key)
    const event3 = await client.events.create(chart.key)

    const firstPage = await client.charts.events(chart.key).firstPage(null, 2)
    const pageAfter = await client.charts.events(chart.key).pageAfter(event2.id, null, 2)

    expect(firstPage.items.map(e => e.key)).toEqual([event3.key, event2.key])
    expect(firstPage.nextPageStartsAfter).toEqual(event2.id + '')
    expect(pageAfter.items.map(e => e.key)).toEqual([event1.key])
})
