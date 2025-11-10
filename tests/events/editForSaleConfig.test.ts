import { TestUtils } from '../testUtils'
import { CreateEventParams } from '../../src/Events/CreateEventParams'
import { ForSaleConfig } from '../../src/Events/ForSaleConfig'

test('should mark objects as for sale', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withForSaleConfig(new ForSaleConfig(false, ['A-1', 'A-2', 'A-3'], {}, [])))

    await client.events.editForSaleConfig(event.key, [{ object: 'A-1' }, { object: 'A-2' }])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig!.forSale).toBe(false)
    expect(retrievedEvent.forSaleConfig!.objects).toEqual(['A-3'])
})

test('returns result', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withForSaleConfig(new ForSaleConfig(false, ['A-1', 'A-2', 'A-3'], {}, [])))

    const result = await client.events.editForSaleConfig(event.key, [{ object: 'A-1' }, { object: 'A-2' }])

    expect(result.forSaleConfig.forSale).toBe(false)
    expect(result.forSaleConfig.objects).toEqual(['A-3'])

    expect(result.rateLimitInfo.rateLimitRemainingCalls).toBe(9)
    expect(result.rateLimitInfo.rateLimitResetDate).toBeTruthy()
})

test('should mark objects as not for sale', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.editForSaleConfig(event.key, null, [{ object: 'A-1' }, { object: 'A-2' }])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig!.forSale).toBe(false)
    expect(retrievedEvent.forSaleConfig!.objects).toEqual(['A-1', 'A-2'])
})

test('should mark places in area as not for sale', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.editForSaleConfig(event.key, null, [{ object: 'GA1', quantity: 5 }])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig!.areaPlaces).toEqual({ GA1: 5 })
})
