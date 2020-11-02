const testUtils = require('../testUtils.js')
const TableBookingConfig = require('../../src/Events/TableBookingConfig')

test('should retrieve event', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const now = new Date()
    const event = await client.events.create(chartKey)

    const retrievedEvent = await client.events.retrieve(event.key)

    expect(retrievedEvent.key).toBe(event.key)
    expect(retrievedEvent.id).toBe(event.id)
    expect(retrievedEvent.chartKey).toBe(chartKey)
    expect(retrievedEvent.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    expect(retrievedEvent.supportsBestAvailable).toBe(true)
    expect(retrievedEvent.createdOn).toBeInstanceOf(Date)
    expect(retrievedEvent.createdOn.getTime()).toBeLessThanOrEqual(now.getTime() + 5000)
    expect(retrievedEvent.forSaleConfig).toBeFalsy()
    expect(retrievedEvent.updatedOn).toBeNull()
})
