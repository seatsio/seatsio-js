import { TestUtils } from '../TestUtils'
import { StatusChangeRequest } from '../../src/Events/StatusChangeRequest.js'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list status changes for objects', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatusInBatch([
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'A-1', 's1'),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'A-1', 's2'),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'A-2', 's4'),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'A-1', 's3')
    ])
    await TestUtils.statusChangesPresent(client, event.key, 4)

    const statuses = []
    for await (const statusChange of client.events.statusChangesForObject(event.key, 'A-1').all()) {
        statuses.push(statusChange.status)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statuses.sort()).toEqual(['s1', 's2', 's3'])
})
