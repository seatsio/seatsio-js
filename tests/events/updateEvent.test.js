const testUtils = require('../testUtils.js')

test("should update event's chart key", async () => {
    let chart1 = await client.charts.create()
    let chart2 = await client.charts.create()
    let event = await client.events.create(chart1.key)

    await client.events.update(event.key, chart2.key)

    let retrievedEvent = await client.events.retrieve(event.key)
    let now = new Date()
    expect(retrievedEvent.chartKey).toBe(chart2.key)
    expect(retrievedEvent.updatedOn).toBeInstanceOf(Date)
    expect(retrievedEvent.updatedOn.getTime()).toBeLessThanOrEqual(now.getTime())
    expect(retrievedEvent.updatedOn.getTime()).toBeGreaterThanOrEqual((now.getTime() - 60000))
})

test('should update event key', async () => {
    let chart = await client.charts.create()
    let event = await client.events.create(chart.key)

    await client.events.update(event.key, null, 'newKey')

    let retrievedEvent = await client.events.retrieve('newKey')
    expect(retrievedEvent.chartKey).toBe(chart.key)
    expect(retrievedEvent.key).toBe('newKey')
})

test('should update bookWholeTables parameter of an event', async () => {
    let chart = await client.charts.create()
    let event = await client.events.create(chart.key)

    await client.events.update(event.key, null, null, true)

    let retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.chartKey).toBe(chart.key)
    expect(retrievedEvent.key).toBe(event.key)
    expect(retrievedEvent.bookWholeTables).toBe(true)
})

test('should update tableBookingModes parameter of an event', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)
    let event = await client.events.create(chartKey)

    await client.events.update(event.key, null, null, { 'T1': 'BY_TABLE', 'T2': 'BY_SEAT' })

    let retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.chartKey).toBe(chartKey)
    expect(retrievedEvent.key).toBe(event.key)
    expect(retrievedEvent.bookWholeTables).toBe(false)
    expect(retrievedEvent.tableBookingModes).toEqual({ 'T1': 'BY_TABLE', 'T2': 'BY_SEAT' })
})
