import { TestUtils } from '../testUtils'
import { StatusChangeRequest } from '../../src/Events/StatusChangeRequest'

test('should list status changes for objects', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest().withEventKey(event.key).withObjects('A-1').withStatus('s1'),
        new StatusChangeRequest().withEventKey(event.key).withObjects('A-1').withStatus('s2'),
        new StatusChangeRequest().withEventKey(event.key).withObjects('A-2').withStatus('s4'),
        new StatusChangeRequest().withEventKey(event.key).withObjects('A-1').withStatus('s3')
    ])
    await TestUtils.statusChangesPresent(client, event.key, 4)

    const statuses = []
    for await (const statusChange of client.events.statusChangesForObject(event.key, 'A-1').all()) {
        statuses.push(statusChange.status)
    }

    expect(statuses.sort()).toEqual(['s1', 's2', 's3'])
})
