const testUtils = require('../testUtils.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')

test('should retrieve object status', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const retrievedObj = await client.events.retrieveObjectStatus(event.key, 'A-1')

    expect(retrievedObj.status).toEqual(ObjectStatus.FREE)
    expect(retrievedObj.ticketType).toBeFalsy()
    expect(retrievedObj.extraData).toBeFalsy()
    expect(retrievedObj.forSale).toBe(true)
})
