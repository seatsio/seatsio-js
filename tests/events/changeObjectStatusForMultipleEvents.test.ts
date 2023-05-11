// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status for multiple events', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)

    await client.events.changeObjectStatus([event1.key, event2.key], 'A-1', 'lolzor')

    const objectInfo1 = await client.events.retrieveObjectInfo(event1.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event2.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo1.status).toBe('lolzor')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo2.status).toBe('lolzor')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should book multiple events', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event1 = await client.events.create(chartKey)
    const event2 = await client.events.create(chartKey)

    await client.events.book([event1.key, event2.key], 'A-1')

    const objectInfo1 = await client.events.retrieveObjectInfo(event1.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event2.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo1.status).toBe(EventObjectInfo.BOOKED)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo2.status).toBe(EventObjectInfo.BOOKED)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo1.status).toBe(EventObjectInfo.FREE)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo2.status).toBe(EventObjectInfo.FREE)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo1.status).toBe(EventObjectInfo.HELD)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo2.status).toBe(EventObjectInfo.HELD)
})
