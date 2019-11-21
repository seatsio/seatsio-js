const testUtils = require('../testUtils.js')

test('should retrieve event', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    let now = new Date()
    let event = await client.events.create(chartKey)

    let retrievedEvent = await client.events.retrieve(event.key)

    expect(retrievedEvent.key).toBe(event.key)
    expect(retrievedEvent.id).toBe(event.id)
    expect(retrievedEvent.chartKey).toBe(chartKey)
    expect(retrievedEvent.bookWholeTables).toBe(false)
    expect(retrievedEvent.supportsBestAvailable).toBe(true)
    expect(retrievedEvent.createdOn).toBeInstanceOf(Date)
    expect(retrievedEvent.createdOn.getTime()).toBeLessThanOrEqual(now.getTime() + 5000)
    expect(retrievedEvent.forSaleConfig).toBeFalsy()
    expect(retrievedEvent.updatedOn).toBeNull()
})
