import { TestUtils } from '../testUtils'

test('should list events in first page', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const events = await TestUtils.createArray(3, () => client.events.create(chart.key))

    const page = await client.events.listFirstPage()

    const retrievedEventKeys = page.items.map((event: any) => event.key)
    expect(retrievedEventKeys.sort()).toEqual(events.map(e => e.key).sort())
})

test('should list events in first page with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await TestUtils.createArray(7, () => client.events.create(chart.key))
    const event8 = await client.events.create(chart.key)
    const event9 = await client.events.create(chart.key)
    const event10 = await client.events.create(chart.key)

    const page = await client.events.listFirstPage(3)

    const retrievedEventKeys = page.items.map((event: any) => event.key)
    expect(retrievedEventKeys.length).toBe(3)
    expect(retrievedEventKeys).toEqual([event10.key, event9.key, event8.key])
})
