import { TestUtils } from '../testUtils'
import { CreateEventParams } from '../../src/Events/CreateEventParams'
import { ForSaleConfig } from '../../src/Events/ForSaleConfig'
import { ForSaleConfigParams } from '../../src/Events/ForSaleConfigParams'

test('should mark objects as for sale', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey, new CreateEventParams().withForSaleConfig(new ForSaleConfig(false, ['A-1', 'A-2', 'A-3'], {}, [])))
    const event2 = await client.events.create(chartKey, new CreateEventParams().withForSaleConfig(new ForSaleConfig(false, ['A-1', 'A-2', 'A-3'], {}, [])))

    const result = await client.events.editForSaleConfigForEvents({
        [event1.key]: new ForSaleConfigParams().withForSale([{ object: 'A-1' }]),
        [event2.key]: new ForSaleConfigParams().withForSale([{ object: 'A-2' }])
    })

    expect(result[event1.key].forSaleConfig.forSale).toBe(false)
    expect(result[event1.key].forSaleConfig.objects).toEqual(['A-2', 'A-3'])

    expect(result[event2.key].forSaleConfig.forSale).toBe(false)
    expect(result[event2.key].forSaleConfig.objects).toEqual(['A-1', 'A-3'])
})

test('should mark objects as not for sale', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)

    const result = await client.events.editForSaleConfigForEvents({
        [event1.key]: new ForSaleConfigParams().withNotForSale([{ object: 'A-1' }]),
        [event2.key]: new ForSaleConfigParams().withNotForSale([{ object: 'A-2' }])
    })

    expect(result[event1.key].forSaleConfig.forSale).toBe(false)
    expect(result[event1.key].forSaleConfig.objects).toEqual(['A-1'])

    expect(result[event2.key].forSaleConfig.forSale).toBe(false)
    expect(result[event2.key].forSaleConfig.objects).toEqual(['A-2'])
})
