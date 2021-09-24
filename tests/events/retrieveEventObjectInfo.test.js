const testUtils = require('../testUtils.js')
const EventObjectInfo = require('../../src/Events/EventObjectInfo.js')

test('should retrieve event object info', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')

    expect(objectInfo.status).toEqual(EventObjectInfo.FREE)
    expect(objectInfo.ticketType).toBeFalsy()
    expect(objectInfo.extraData).toBeFalsy()
    expect(objectInfo.forSale).toBe(true)
})
