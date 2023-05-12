import { TestUtils } from '../testUtils'

test('should mark objects as for sale', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.markAsForSale(event.key, ['o1', 'o2'], { GA1: 3 }, ['cat1', 'cat2'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig.forSale).toBe(true)
    expect(retrievedEvent.forSaleConfig.objects).toEqual(['o1', 'o2'])
    expect(retrievedEvent.forSaleConfig.areaPlaces).toEqual({ GA1: 3 })
    expect(retrievedEvent.forSaleConfig.categories).toEqual(['cat1', 'cat2'])
})

test('that categories and area places are optional', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.markAsForSale(event.key, ['o1', 'o2'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig.objects).toEqual(['o1', 'o2'])
    expect(retrievedEvent.forSaleConfig.areaPlaces).toEqual({})
    expect(retrievedEvent.forSaleConfig.categories.length).toBe(0)
})

test('that objects are optional', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.markAsForSale(event.key, null, null, ['cat1', 'cat2'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig.categories).toEqual(['cat1', 'cat2'])
    expect(retrievedEvent.forSaleConfig.areaPlaces).toEqual({})
    expect(retrievedEvent.forSaleConfig.objects.length).toBe(0)
})
