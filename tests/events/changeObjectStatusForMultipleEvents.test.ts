import { TestUtils } from '../testUtils'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo'

test('should change object status for multiple events', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)

    await client.events.changeObjectStatus([event1.key, event2.key], 'A-1', 'lolzor')

    const objectInfo1 = await client.events.retrieveObjectInfo(event1.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event2.key, 'A-1')
    expect(objectInfo1.status).toBe('lolzor')
    expect(objectInfo2.status).toBe('lolzor')
})

test('should book multiple events', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)

    await client.events.book([event1.key, event2.key], 'A-1')

    const objectInfo1 = await client.events.retrieveObjectInfo(event1.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event2.key, 'A-1')
    expect(objectInfo1.status).toBe(EventObjectInfo.BOOKED)
    expect(objectInfo2.status).toBe(EventObjectInfo.BOOKED)
})

test('should put objects up for resale on multiple events', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)

    await client.events.putUpForResale([event1.key, event2.key], 'A-1')

    const objectInfo1 = await client.events.retrieveObjectInfo(event1.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event2.key, 'A-1')
    expect(objectInfo1.status).toBe(EventObjectInfo.RESALE)
    expect(objectInfo2.status).toBe(EventObjectInfo.RESALE)
})

test('should release multiple events', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
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
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()

    await client.events.hold([event1.key, event2.key], 'A-1', holdToken.holdToken)

    const objectInfo1 = await client.events.retrieveObjectInfo(event1.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event2.key, 'A-1')
    expect(objectInfo1.status).toBe(EventObjectInfo.HELD)
    expect(objectInfo2.status).toBe(EventObjectInfo.HELD)
})

test('resale listingID', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)

    await client.events.changeObjectStatus([event1.key, event2.key], 'A-1', EventObjectInfo.RESALE, null, null, null, null, null, null, null, 'listing1')

    const objectInfo1 = await client.events.retrieveObjectInfo(event1.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event2.key, 'A-1')
    expect(objectInfo1.resaleListingId).toBe('listing1')
    expect(objectInfo2.resaleListingId).toBe('listing1')
})
