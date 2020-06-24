const testUtils = require('../testUtils.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')

test('should change object status for multiple events', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)

    await client.events.changeObjectStatus([event1.key, event2.key], 'A-1', 'lolzor')

    const objStatus1 = await client.events.retrieveObjectStatus(event1.key, 'A-1')
    const objStatus2 = await client.events.retrieveObjectStatus(event2.key, 'A-1')
    expect(objStatus1.status).toBe('lolzor')
    expect(objStatus2.status).toBe('lolzor')
})

test('should book multiple events', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)

    await client.events.book([event1.key, event2.key], 'A-1')

    const objStatus1 = await client.events.retrieveObjectStatus(event1.key, 'A-1')
    const objStatus2 = await client.events.retrieveObjectStatus(event2.key, 'A-1')
    expect(objStatus1.status).toBe(ObjectStatus.BOOKED)
    expect(objStatus2.status).toBe(ObjectStatus.BOOKED)
})

test('should release multiple events', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)
    await client.events.book([event1.key, event2.key], 'A-1')

    await client.events.release([event1.key, event2.key], 'A-1')

    const objStatus1 = await client.events.retrieveObjectStatus(event1.key, 'A-1')
    const objStatus2 = await client.events.retrieveObjectStatus(event2.key, 'A-1')
    expect(objStatus1.status).toBe(ObjectStatus.FREE)
    expect(objStatus2.status).toBe(ObjectStatus.FREE)
})

test('should hold multiple events', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()

    await client.events.hold([event1.key, event2.key], 'A-1', holdToken.holdToken)

    const objStatus1 = await client.events.retrieveObjectStatus(event1.key, 'A-1')
    const objStatus2 = await client.events.retrieveObjectStatus(event2.key, 'A-1')
    expect(objStatus1.status).toBe(ObjectStatus.HELD)
    expect(objStatus2.status).toBe(ObjectStatus.HELD)
})
