const testUtils = require('../testUtils.js')

test('should update event\'s chart key', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    const event = await client.events.create(chart1.key)

    await client.events.update(event.key, chart2.key)

    const retrievedEvent = await client.events.retrieve(event.key)
    const now = new Date()
    expect(retrievedEvent.chartKey).toBe(chart2.key)
    expect(retrievedEvent.updatedOn).toBeInstanceOf(Date)
    expect(retrievedEvent.updatedOn.getTime()).toBeLessThanOrEqual(now.getTime())
    expect(retrievedEvent.updatedOn.getTime()).toBeGreaterThanOrEqual((now.getTime() - 60000))
})

test('should update event key', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.update(event.key, null, 'newKey')

    const retrievedEvent = await client.events.retrieve('newKey')
    expect(retrievedEvent.chartKey).toBe(chart.key)
    expect(retrievedEvent.key).toBe('newKey')
})

test('should update bookWholeTables parameter of an event', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.update(event.key, null, null, true)

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.chartKey).toBe(chart.key)
    expect(retrievedEvent.key).toBe(event.key)
    expect(retrievedEvent.bookWholeTables).toBe(true)
})

test('should update tableBookingModes parameter of an event', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.update(event.key, null, null, { T1: 'BY_TABLE', T2: 'BY_SEAT' })

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.chartKey).toBe(chartKey)
    expect(retrievedEvent.key).toBe(event.key)
    expect(retrievedEvent.bookWholeTables).toBe(false)
    expect(retrievedEvent.tableBookingModes).toEqual({ T1: 'BY_TABLE', T2: 'BY_SEAT' })
})
