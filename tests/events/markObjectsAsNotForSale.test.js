const testUtils = require('../testUtils.js')

test('should mark objects as not for sale', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.markAsNotForSale(event.key, ['o1', 'o2'], { GA1: 3 }, ['cat1', 'cat2'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig.forSale).toBe(false)
    expect(retrievedEvent.forSaleConfig.objects).toEqual(['o1', 'o2'])
    expect(retrievedEvent.forSaleConfig.areaPlaces).toEqual({ GA1: 3 })
    expect(retrievedEvent.forSaleConfig.categories).toEqual(['cat1', 'cat2'])
})

test('that categories and area places are optional for mark as not for sale', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.markAsNotForSale(event.key, ['o1', 'o2'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig.objects).toEqual(['o1', 'o2'])
    expect(retrievedEvent.forSaleConfig.areaPlaces).toEqual({})
    expect(retrievedEvent.forSaleConfig.categories.length).toBe(0)
})

test('that objects are optional for mark as not for sale', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.markAsNotForSale(event.key, null, null, ['cat1', 'cat2'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig.categories).toEqual(['cat1', 'cat2'])
    expect(retrievedEvent.forSaleConfig.areaPlaces).toEqual({})
    expect(retrievedEvent.forSaleConfig.objects.length).toBe(0)
})
