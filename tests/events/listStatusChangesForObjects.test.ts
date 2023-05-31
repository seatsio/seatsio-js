import { TestUtils } from '../testUtils'
import { StatusChangeRequest } from '../../src/Events/StatusChangeRequest'

test('should list status changes for objects', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest(event.key, 'A-1', 's1', null, null, null, null, null, null, null),
        new StatusChangeRequest(event.key, 'A-1', 's2', null, null, null, null, null, null, null),
        new StatusChangeRequest(event.key, 'A-2', 's4', null, null, null, null, null, null, null),
        new StatusChangeRequest(event.key, 'A-1', 's3', null, null, null, null, null, null, null)
    ])
    await TestUtils.statusChangesPresent(client, event.key, 4)

    const statuses = []
    for await (const statusChange of client.events.statusChangesForObject(event.key, 'A-1').all()) {
        statuses.push(statusChange.status)
    }

    expect(statuses.sort()).toEqual(['s1', 's2', 's3'])
})
