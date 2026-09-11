import { TestUtils } from '../testUtils.js'

test('should mark everything as not for sale', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.markEverythingAsNotForSale(event.key)

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig!.forSale).toBe(true)
    expect(retrievedEvent.forSaleConfig!.objects).toEqual([])
    expect(retrievedEvent.forSaleConfig!.categories).toEqual([])
    expect(retrievedEvent.forSaleConfig!.areaPlaces).toEqual({})
})
