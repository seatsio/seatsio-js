const testUtils = require('../testUtils.js')
const StatusChangeRequest = require('../../src/Events/StatusChangeRequest.js')

test('should change object status in batch', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()

    const chartKey1 = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey1, user.secretKey)
    const event1 = await client.events.create(chartKey1)

    const chartKey2 = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey2, user.secretKey)
    const event2 = await client.events.create(chartKey2)

    const result = await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest(event1.key, 'A-1', 'lolzor'),
        new StatusChangeRequest(event2.key, 'A-2', 'lolzor')
    ])

    expect(result[0].objects['A-1'].status).toBe('lolzor')
    const status1 = await client.events.retrieveObjectStatus(event1.key, 'A-1')
    expect(status1.status).toBe('lolzor')

    expect(result[1].objects['A-2'].status).toBe('lolzor')
    const status2 = await client.events.retrieveObjectStatus(event2.key, 'A-2')
    expect(status2.status).toBe('lolzor')
})
