const testUtils = require('../testUtils.js')

test('should list status changes for objects', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatus(event.key, 'A-1', 's1')
    await client.events.changeObjectStatus(event.key, 'A-1', 's2')
    await client.events.changeObjectStatus(event.key, 'A-2', 's4')
    await client.events.changeObjectStatus(event.key, 'A-1', 's3')
    const statuses = []

    for await (const statusChange of client.events.statusChangesForObject(event.key, 'A-1').all()) {
        statuses.push(statusChange.status)
    }

    expect(statuses.sort()).toEqual(['s1', 's2', 's3'])
})
