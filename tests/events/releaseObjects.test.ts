import { TestUtils } from '../TestUtils'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo.js'
import { ObjectProperties } from '../../src/Events/ObjectProperties.js'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should release objects', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, ['A-1', 'A-2'])

    const releaseRes = await client.events.release(event.key, ['A-1', 'A-2'])

    const status1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const status2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status1.status).toBe(EventObjectInfo.FREE)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status2.status).toBe(EventObjectInfo.FREE)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Object.keys(releaseRes.objects).sort()).toEqual(['A-1', 'A-2'])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should release objects with hold tokens', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'A-1', holdToken.holdToken)

    await client.events.release(event.key, 'A-1', holdToken.holdToken)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe(EventObjectInfo.FREE)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.holdToken).toBeFalsy()
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should release objects with order id', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')

    await client.events.release(event.key, 'A-1', null, 'order1')

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe(EventObjectInfo.FREE)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.orderId).toBe('order1')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should keep extra data', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, [new ObjectProperties('A-1').setExtraData({ foo: 'bar' })])

    await client.events.release(event.key, ['A-1'], null, null, true)

    const status = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status.extraData).toEqual({ foo: 'bar' })
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should accept channel keys', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        channelKey1: { name: 'channel 1', color: '#FFAABB', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channelKey1: ['A-1'] })
    await client.events.book(event.key, ['A-1'], null, null, null, null, ['channelKey1'])

    await client.events.release(event.key, ['A-1'], null, null, null, null, ['channelKey1'])

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe(EventObjectInfo.FREE)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should accept ignoreChannels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        channelKey1: { name: 'channel 1', color: '#FFAABB', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channelKey1: ['A-1'] })
    await client.events.book(event.key, ['A-1'], null, null, null, null, ['channelKey1'])

    await client.events.release(event.key, ['A-1'], null, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe(EventObjectInfo.FREE)
})
