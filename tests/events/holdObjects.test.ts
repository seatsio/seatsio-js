import { TestUtils } from '../testUtils'
import { SocialDistancingRuleset } from '../../src/Charts/SocialDistancingRuleset'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo'

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
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.channels.replace(event.key, [
        { key: 'channelKey1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1'] }
    ])
    await client.events.hold(event.key, ['A-1'], holdToken.holdToken, null, null, null, ['channelKey1'])

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
})

test('should accept ignoreChannels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.channels.replace(event.key, [
        { key: 'channel1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1'] }
    ])

    await client.events.hold(event.key, ['A-1'], holdToken.holdToken, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
})

test('should accept ignoreSocialDistancing', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const ruleset = SocialDistancingRuleset.fixed('ruleset').setDisabledSeats(['A-1']).build()
    await client.charts.saveSocialDistancingRulesets(chartKey, { ruleset })
    await client.events.update(event.key, null, null, null, 'ruleset')
    const holdToken = await client.holdTokens.create()

    await client.events.hold(event.key, ['A-1'], holdToken.holdToken, null, null, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
})
