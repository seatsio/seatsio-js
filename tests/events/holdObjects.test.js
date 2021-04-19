const testUtils = require('../testUtils.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')
const SocialDistancingRuleset = require('../../src/Charts/SocialDistancingRuleset')

test('should hold objects', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    const holdResult = await client.events.hold(event.key, ['A-1', 'A-2'], holdToken.holdToken)

    const status1 = await client.events.retrieveObjectStatus(event.key, 'A-1')
    expect(status1.status).toBe(ObjectStatus.HELD)
    expect(status1.holdToken).toBe(holdToken.holdToken)

    const status2 = await client.events.retrieveObjectStatus(event.key, 'A-2')
    expect(status2.status).toBe(ObjectStatus.HELD)
    expect(status2.holdToken).toBe(holdToken.holdToken)

    expect(Object.keys(holdResult.objects).sort()).toEqual(['A-1', 'A-2'])
})

test('should keep extra data', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.updateExtraData(event.key, 'A-1', { foo: 'bar' })

    await client.events.hold(event.key, ['A-1'], holdToken.holdToken, null, true)

    const retrievedObjStatus1 = await client.events.retrieveObjectStatus(event.key, 'A-1')
    expect(retrievedObjStatus1.extraData).toEqual({ foo: 'bar' })
})

test('should accept channel keys', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.updateChannels(event.key, {
        channelKey1: { name: 'channel 1', color: '#FFAABB', index: 1 }
    })
    await client.events.assignObjectsToChannel(event.key, { channelKey1: ['A-1'] })
    await client.events.hold(event.key, ['A-1'], holdToken.holdToken, null, null, null, ['channelKey1'])

    const objStatus = await client.events.retrieveObjectStatus(event.key, 'A-1')
    expect(objStatus.status).toBe(ObjectStatus.HELD)
})

test('should accept ignoreChannels', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.updateChannels(event.key, {
        channelKey1: { name: 'channel 1', color: '#FFAABB', index: 1 }
    })
    await client.events.assignObjectsToChannel(event.key, { channelKey1: ['A-1'] })

    await client.events.hold(event.key, ['A-1'], holdToken.holdToken, null, null, true)

    const objStatus = await client.events.retrieveObjectStatus(event.key, 'A-1')
    expect(objStatus.status).toBe(ObjectStatus.HELD)
})

test('should accept ignoreSocialDistancing', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const ruleset = SocialDistancingRuleset.fixed('ruleset').setDisabledSeats(['A-1']).build()
    await client.charts.saveSocialDistancingRulesets(chartKey, { ruleset })
    await client.events.update(event.key, null, null, null, 'ruleset')
    const holdToken = await client.holdTokens.create()

    await client.events.hold(event.key, ['A-1'], holdToken.holdToken, null, null, null, null, true)

    const objStatus = await client.events.retrieveObjectStatus(event.key, 'A-1')
    expect(objStatus.status).toBe(ObjectStatus.HELD)
})
