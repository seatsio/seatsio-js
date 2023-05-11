import { TestUtils } from '../TestUtils'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo.js'
import { SocialDistancingRuleset } from '../../src/Charts/SocialDistancingRuleset'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should hold objects', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    const holdResult = await client.events.hold(event.key, ['A-1', 'A-2'], holdToken.holdToken)

    const status1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status1.status).toBe(EventObjectInfo.HELD)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status1.holdToken).toBe(holdToken.holdToken)

    const status2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status2.status).toBe(EventObjectInfo.HELD)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status2.holdToken).toBe(holdToken.holdToken)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Object.keys(holdResult.objects).sort()).toEqual(['A-1', 'A-2'])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should keep extra data', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.updateExtraData(event.key, 'A-1', { foo: 'bar' })

    await client.events.hold(event.key, ['A-1'], holdToken.holdToken, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.extraData).toEqual({ foo: 'bar' })
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should accept channel keys', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.channels.replace(event.key, {
        channelKey1: { name: 'channel 1', color: '#FFAABB', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channelKey1: ['A-1'] })
    await client.events.hold(event.key, ['A-1'], holdToken.holdToken, null, null, null, ['channelKey1'])

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should accept ignoreChannels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.channels.replace(event.key, {
        channelKey1: { name: 'channel 1', color: '#FFAABB', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channelKey1: ['A-1'] })

    await client.events.hold(event.key, ['A-1'], holdToken.holdToken, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
})
