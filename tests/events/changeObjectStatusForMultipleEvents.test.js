const testUtils = require('../testUtils.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')

test('should change object status for multiple events', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event1 = await client.events.create(chartKey)
    let event2 = await client.events.create(chartKey)

    await client.events.changeObjectStatus([event1.key, event2.key], 'A-1', 'lolzor')

    let objStatus1 = await client.events.retrieveObjectStatus(event1.key, 'A-1')
    let objStatus2 = await client.events.retrieveObjectStatus(event2.key, 'A-1')
    expect(objStatus1.status).toBe('lolzor')
    expect(objStatus2.status).toBe('lolzor')
})

test('should book multiple events', async () => {
    let chartKey = testUtils.getChartKey()
    let objectStatus = new ObjectStatus()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event1 = await client.events.create(chartKey)
    let event2 = await client.events.create(chartKey)

    await client.events.book([event1.key, event2.key], 'A-1')

    let objStatus1 = await client.events.retrieveObjectStatus(event1.key, 'A-1')
    let objStatus2 = await client.events.retrieveObjectStatus(event2.key, 'A-1')
    expect(objStatus1.status).toBe(objectStatus.BOOKED)
    expect(objStatus2.status).toBe(objectStatus.BOOKED)
})

test('should release multiple events', async () => {
    let chartKey = testUtils.getChartKey()
    let objectStatus = new ObjectStatus()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event1 = await client.events.create(chartKey)
    let event2 = await client.events.create(chartKey)
    await client.events.book([event1.key, event2.key], 'A-1')

    await client.events.release([event1.key, event2.key], 'A-1')

    let objStatus1 = await client.events.retrieveObjectStatus(event1.key, 'A-1')
    let objStatus2 = await client.events.retrieveObjectStatus(event2.key, 'A-1')
    expect(objStatus1.status).toBe(objectStatus.FREE)
    expect(objStatus2.status).toBe(objectStatus.FREE)
})

test('should hold multiple events', async () => {
    let chartKey = testUtils.getChartKey()
    let objectStatus = new ObjectStatus()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event1 = await client.events.create(chartKey)
    let event2 = await client.events.create(chartKey)
    let holdToken = await client.holdTokens.create()

    await client.events.hold([event1.key, event2.key], 'A-1', holdToken.holdToken)

    let objStatus1 = await client.events.retrieveObjectStatus(event1.key, 'A-1')
    let objStatus2 = await client.events.retrieveObjectStatus(event2.key, 'A-1')
    expect(objStatus1.status).toBe(objectStatus.HELD)
    expect(objStatus2.status).toBe(objectStatus.HELD)
})
