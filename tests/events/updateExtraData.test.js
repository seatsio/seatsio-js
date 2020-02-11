const testUtils = require('../testUtils.js')

test('should update extra data of an event', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const extraData = { foo: 'bar' }

    await client.events.updateExtraData(event.key, 'A-1', extraData)

    const objStatus = await client.events.retrieveObjectStatus(event.key, 'A-1')
    expect(objStatus.extraData).toEqual(extraData)
})
