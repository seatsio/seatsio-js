const testUtils = require('../testUtils.js')
const EventObjectInfo = require('../../src/Events/EventObjectInfo.js')

test('should change object status for multiple events', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)

    await client.events.changeObjectStatus([event1.key, event2.key], 'A-1', 'lolzor')

    const objectInfo1 = await client.events.retrieveObjectInfo(event1.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event2.key, 'A-1')
    expect(objectInfo1.status).toBe('lolzor')
    expect(objectInfo2.status).toBe('lolzor')
})

test('should book multiple events', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)

    await client.events.book([event1.key, event2.key], 'A-1')

    const objectInfo1 = await client.events.retrieveObjectInfo(event1.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event2.key, 'A-1')
    expect(objectInfo1.status).toBe(EventObjectInfo.BOOKED)
    expect(objectInfo2.status).toBe(EventObjectInfo.BOOKED)
})

test('should release multiple events', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)
    await client.events.book([event1.key, event2.key], 'A-1')

    await client.events.release([event1.key, event2.key], 'A-1')

    const objectInfo1 = await client.events.retrieveObjectInfo(event1.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event2.key, 'A-1')
    expect(objectInfo1.status).toBe(EventObjectInfo.FREE)
    expect(objectInfo2.status).toBe(EventObjectInfo.FREE)
})

test('should hold multiple events', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()

    await client.events.hold([event1.key, event2.key], 'A-1', holdToken.holdToken)

    const objectInfo1 = await client.events.retrieveObjectInfo(event1.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event2.key, 'A-1')
    expect(objectInfo1.status).toBe(EventObjectInfo.HELD)
    expect(objectInfo2.status).toBe(EventObjectInfo.HELD)
})
