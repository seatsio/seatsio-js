const testUtils = require('../testUtils.js')

test('should list events in first page', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const events = await testUtils.createArray(20, () => client.events.create(chart.key))

    const page = await client.events.listFirstPage()

    const retrievedEventKeys = page.items.map((event) => event.key)
    expect(retrievedEventKeys.sort()).toEqual(events.map(e => e.key).sort())
})

test('should list events in first page with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await testUtils.createArray(17, () => client.events.create(chart.key))
    const event18 = await client.events.create(chart.key)
    const event19 = await client.events.create(chart.key)
    const event20 = await client.events.create(chart.key)

    const page = await client.events.listFirstPage(3)

    const retrievedEventKeys = page.items.map((event) => event.key)
    expect(retrievedEventKeys.length).toBe(3)
    expect(retrievedEventKeys).toEqual([event20.key, event19.key, event18.key])
})
