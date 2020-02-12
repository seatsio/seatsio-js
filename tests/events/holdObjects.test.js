const testUtils = require('../testUtils.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')

test('should hold objects', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    const objectStatus = new ObjectStatus()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    const holdResult = await client.events.hold(event.key, ['A-1', 'A-2'], holdToken.holdToken)

    const status1 = await client.events.retrieveObjectStatus(event.key, 'A-1')
    expect(status1.status).toBe(objectStatus.HELD)
    expect(status1.holdToken).toBe(holdToken.holdToken)

    const status2 = await client.events.retrieveObjectStatus(event.key, 'A-2')
    expect(status2.status).toBe(objectStatus.HELD)
    expect(status2.holdToken).toBe(holdToken.holdToken)

    expect(Object.keys(holdResult.objects)).toEqual(['A-1', 'A-2'])
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
