import { TestUtils } from '../testUtils'

test('objects', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.replaceForSaleConfig(event.key, false, ['o1', 'o2'], { GA1: 3 }, ['cat1', 'cat2'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig!.forSale).toBe(false)
    expect(retrievedEvent.forSaleConfig!.objects).toEqual(['o1', 'o2'])
    expect(retrievedEvent.forSaleConfig!.areaPlaces).toEqual({ GA1: 3 })
    expect(retrievedEvent.forSaleConfig!.categories).toEqual(['cat1', 'cat2'])
})

test('categories and area places are optional', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.replaceForSaleConfig(event.key, false, ['o1', 'o2'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig!.objects).toEqual(['o1', 'o2'])
    expect(retrievedEvent.forSaleConfig!.areaPlaces).toEqual({})
    expect(retrievedEvent.forSaleConfig!.categories!.length).toBe(0)
})

test('objects are optional', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.replaceForSaleConfig(event.key, false, null, null, ['cat1', 'cat2'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig!.categories).toEqual(['cat1', 'cat2'])
    expect(retrievedEvent.forSaleConfig!.areaPlaces).toEqual({})
    expect(retrievedEvent.forSaleConfig!.objects.length).toBe(0)
})

test('numNotForSale should be correctly exposed', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.replaceForSaleConfig(event.key, false, [], { GA1: 5 }, [])

    const eventObjectInfo = await client.events.retrieveObjectInfo(event.key, 'GA1')
    expect(eventObjectInfo.numNotForSale!).toEqual(5)
})

test('for sale', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.replaceForSaleConfig(event.key, true, ['o1', 'o2'], { GA1: 3 }, ['cat1', 'cat2'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig!.forSale).toBe(true)
    expect(retrievedEvent.forSaleConfig!.objects).toEqual(['o1', 'o2'])
    expect(retrievedEvent.forSaleConfig!.areaPlaces).toEqual({ GA1: 3 })
    expect(retrievedEvent.forSaleConfig!.categories).toEqual(['cat1', 'cat2'])
})
