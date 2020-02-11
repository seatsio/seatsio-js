const testUtils = require('../testUtils.js')

test('should retrieve chart', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.charts.addTag(chart.key, 'tag1')

    const retrievedChart = await client.charts.retrieve(chart.key)

    expect(retrievedChart.key).toBe(chart.key)
    expect(retrievedChart.id).toBe(chart.id)
    expect(retrievedChart.id).toBeTruthy()
    expect(retrievedChart.name).toBe('Untitled chart')
    expect(retrievedChart.status).toBe('NOT_USED')
    expect(retrievedChart.publishedVersionThumbnailUrl).toBeTruthy()
    expect(retrievedChart.draftVersionThumbnailUrl).toBeNull()
    expect(retrievedChart.tags).toEqual(['tag1'])
    expect(retrievedChart.archived).toBeFalsy()
    expect(retrievedChart.events).toEqual([])
})

test('should retrieve chart with events', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event1 = await client.events.create(chart.key)
    const event2 = await client.events.create(chart.key)

    const retrievedChart = await client.charts.retrieveWithEvents(chart.key)

    const retrievedEventIds = [retrievedChart.events[0].id, retrievedChart.events[1].id]
    expect(retrievedEventIds.sort()).toEqual([event1.id, event2.id].sort())
})

test('should retrieve chart with updated event (bookWholeTables)', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)
    await client.events.update(event.key, null, null, true)

    const retrievedChart = await client.charts.retrieveWithEvents(chart.key)

    expect(retrievedChart.events[0].id).toEqual(event.id)
})

test('should retrieve chart with updated event (markAsForSale and tableBookingModes)', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)
    await client.events.markAsForSale(event.key, ['o1', 'o2'], ['cat1', 'cat2'])
    await client.events.update(event.key, null, null, true)

    const retrievedChart = await client.charts.retrieveWithEvents(chart.key)

    expect(retrievedChart.events[0].id).toEqual(event.id)
})
