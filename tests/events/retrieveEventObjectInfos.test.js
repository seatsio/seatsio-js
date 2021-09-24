const testUtils = require('../testUtils.js')
const EventObjectInfo = require('../../src/Events/EventObjectInfo.js')

test('should retrieve event object infos', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const objectInfos = await client.events.retrieveObjectInfos(event.key, ['A-1', 'A-2'])

    expect(objectInfos['A-1'].status).toEqual(EventObjectInfo.FREE)
    expect(objectInfos['A-2'].status).toEqual(EventObjectInfo.FREE)
    expect(objectInfos['A-3']).toBe(undefined)
})

test('holds', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'GA1', holdToken.holdToken)

    const objectInfos = await client.events.retrieveObjectInfos(event.key, ['GA1'])

    const expectedHolds = {}
    expectedHolds[holdToken.holdToken] = { NO_TICKET_TYPE: 1 }
    expect(objectInfos.GA1.holds).toEqual(expectedHolds)
})
