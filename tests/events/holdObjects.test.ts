import { TestUtils } from '../testUtils'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo'
import {CreateEventParams} from "../../src/Events/CreateEventParams";
import {Channel} from "../../src/Events/Channel";

test('should hold objects', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    const holdResult = await client.events.hold(event.key, ['A-1', 'A-2'], holdToken.holdToken)

    const status1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(status1.status).toBe(EventObjectInfo.HELD)
    expect(status1.holdToken).toBe(holdToken.holdToken)

    const status2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    expect(status2.status).toBe(EventObjectInfo.HELD)
    expect(status2.holdToken).toBe(holdToken.holdToken)

    expect(Object.keys(holdResult.objects).sort()).toEqual(['A-1', 'A-2'])
})

test('should keep extra data', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.updateExtraData(event.key, 'A-1', { foo: 'bar' })

    await client.events.hold(event.key, ['A-1'], holdToken.holdToken, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.extraData).toEqual({ foo: 'bar' })
})

test('should accept channel keys', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channelKey1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1'] })
    ]))
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, ['A-1'], holdToken.holdToken, null, null, null, ['channelKey1'])

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
})

test('should accept ignoreChannels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channel1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1'] })
    ]))
    const holdToken = await client.holdTokens.create()

    await client.events.hold(event.key, ['A-1'], holdToken.holdToken, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
})
