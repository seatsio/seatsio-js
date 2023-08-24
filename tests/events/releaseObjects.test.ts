import { TestUtils } from '../testUtils'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo'
import { ObjectProperties } from '../../src/Events/ObjectProperties'
import { CreateEventParams } from '../../src/Events/CreateEventParams'
import { Channel } from '../../src/Events/Channel'

test('should release objects', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, ['A-1', 'A-2'])

    const releaseRes = await client.events.release(event.key, ['A-1', 'A-2'])

    const status1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const status2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    expect(status1.status).toBe(EventObjectInfo.FREE)
    expect(status2.status).toBe(EventObjectInfo.FREE)
    expect(Object.keys(releaseRes.objects).sort()).toEqual(['A-1', 'A-2'])
})

test('should release objects with hold tokens', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'A-1', holdToken.holdToken)

    await client.events.release(event.key, 'A-1', holdToken.holdToken)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.FREE)
    expect(objectInfo.holdToken).toBeUndefined()
})

test('should release objects with order id', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')

    await client.events.release(event.key, 'A-1', null, 'order1')

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.FREE)
    expect(objectInfo.orderId).toBe('order1')
})

test('should keep extra data', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, [new ObjectProperties('A-1').setExtraData({ foo: 'bar' })])

    await client.events.release(event.key, ['A-1'], null, null, true)

    const status = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(status.extraData).toEqual({ foo: 'bar' })
})

test('should accept channel keys', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channelKey1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1'] })
    ]))
    await client.events.book(event.key, ['A-1'], null, null, null, null, ['channelKey1'])

    await client.events.release(event.key, ['A-1'], null, null, null, null, ['channelKey1'])

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.FREE)
})

test('should accept ignoreChannels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channelKey1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1'] })
    ]))
    await client.events.book(event.key, ['A-1'], null, null, null, null, ['channelKey1'])

    await client.events.release(event.key, ['A-1'], null, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.FREE)
})
