import { TestUtils } from '../testUtils'

test('should mark objects as for sale', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.markAsForSale(event.key, ['o1', 'o2'], { GA1: 3 }, ['cat1', 'cat2'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig!.forSale).toBe(true)
    expect(retrievedEvent.forSaleConfig!.objects).toEqual(['o1', 'o2'])
    expect(retrievedEvent.forSaleConfig!.areaPlaces).toEqual({ GA1: 3 })
    expect(retrievedEvent.forSaleConfig!.categories).toEqual(['cat1', 'cat2'])
})