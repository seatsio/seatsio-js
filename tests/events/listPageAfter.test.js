const testUtils = require('../testUtils.js')

test('should list events after given event id', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event1 = await client.events.create(chart.key)
    const event2 = await client.events.create(chart.key)
    const event3 = await client.events.create(chart.key)

    const page = await client.events.listPageAfter(event3.id)

    const eventKeys = [page.items[0].key, page.items[1].key]
    expect(eventKeys.sort()).toEqual([event1.key, event2.key].sort())
})

test('should list events after given event id with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.events.create(chart.key)
    const event2 = await client.events.create(chart.key)
    const event3 = await client.events.create(chart.key)

    const page = await client.events.listPageAfter(event3.id, 1)

    expect(page.items[0].key).toEqual(event2.key)
})
