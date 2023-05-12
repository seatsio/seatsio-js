import { TestUtils } from '../testUtils'

test('should mark everything as for sale', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)
    await client.events.markAsForSale(event.key, ['o1', 'o2'], null, ['cat1', 'cat2'])

    await client.events.markEverythingAsForSale(event.key)

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig).toBeFalsy()
})
