import { TestUtils } from '../testUtils'
import { StatusChangeRequest } from '../../src/Events/StatusChangeRequest'
import { CreateEventParams } from '../../src/Events/CreateEventParams'
import { Channel } from '../../src/Events/Channel'
import { StatusChangeType } from '../../src/Events/StatusChangeType'
import { EventObjectInfo } from '../../src'

test('should change object status in batch', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()

    const chartKey1 = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey1, user.secretKey)
    const event1 = await client.events.create(chartKey1)

    const chartKey2 = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey2, user.secretKey)
    const event2 = await client.events.create(chartKey2)

    const result = await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest().withEventKey(event1.key).withObjects(['A-1']).withStatus('lolzor'),
        new StatusChangeRequest().withEventKey(event2.key).withObjects(['A-2']).withStatus('lolzor')
    ])

    expect(result[0].objects['A-1'].status).toBe('lolzor')
    const status1 = await client.events.retrieveObjectInfo(event1.key, 'A-1')
    expect(status1.status).toBe('lolzor')

    expect(result[1].objects['A-2'].status).toBe('lolzor')
    const status2 = await client.events.retrieveObjectInfo(event2.key, 'A-2')
    expect(status2.status).toBe('lolzor')
})

test('should accept channel keys', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channelKey1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1'] })
    ]))

    const result = await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest().withEventKey(event.key).withObjects(['A-1']).withStatus('lolzor').withChannelKeys(['channelKey1'])
    ])

    expect(result[0].objects['A-1'].status).toBe('lolzor')
})

test('should accept ignoreChannels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channel1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1', 'A-2'] })
    ]))

    const result = await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest().withEventKey(event.key).withObjects(['A-1']).withStatus('lolzor').withIgnoreChannels(true)
    ])

    expect(result[0].objects['A-1'].status).toBe('lolzor')
})

test('should accept allowedPreviousStatuses', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    try {
        await client.events.changeObjectStatusInBatch([
            new StatusChangeRequest().withEventKey(event.key).withObjects(['A-1']).withStatus('lolzor').withAllowedPreviousStatuses(['MustBeThisStatus'])
        ])
        throw new Error('Should have failed')
    } catch (e: any) {
        expect(e.errors.length).toEqual(1)
        expect(e.errors[0].code).toBe('ILLEGAL_STATUS_CHANGE')
    }
})

test('should accept rejectedPreviousStatuses', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    try {
        await client.events.changeObjectStatusInBatch([
            new StatusChangeRequest().withEventKey(event.key).withObjects(['A-1']).withStatus('lolzor').withRejectedPreviousStatuses(['free'])
        ])
        throw new Error('Should have failed')
    } catch (e: any) {
        expect(e.errors.length).toEqual(1)
        expect(e.errors[0].code).toBe('ILLEGAL_STATUS_CHANGE')
    }
})

test('release in batch', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()

    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.book(event.key, 'A-1')

    const result = await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest().withType(StatusChangeType.RELEASE).withEventKey(event.key).withObjects(['A-1'])
    ])

    expect(result[0].objects['A-1'].status).toBe(EventObjectInfo.FREE)
    const status = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(status.status).toBe(EventObjectInfo.FREE)
})
