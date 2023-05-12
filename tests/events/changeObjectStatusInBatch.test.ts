import { TestUtils } from '../testUtils'
import { StatusChangeRequest } from '../../src/Events/StatusChangeRequest'

test('should change object status in batch', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()

    const chartKey1 = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey1, user.secretKey)
    const event1 = await client.events.create(chartKey1)

    const chartKey2 = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey2, user.secretKey)
    const event2 = await client.events.create(chartKey2)

    const result = await client.events.changeObjectStatusInBatch([
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event1.key, ['A-1'], 'lolzor'),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event2.key, ['A-2'], 'lolzor')
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
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        channelKey1: {
            name: 'channel 1',
            color: '#FFAABB',
            index: 1
        }
    })
    await client.events.channels.setObjects(event.key, {
        channelKey1: ['A-1']
    })

    const result = await client.events.changeObjectStatusInBatch([
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 8.
        new StatusChangeRequest(event.key, ['A-1'], 'lolzor', null, null, null, null, ['channelKey1'])
    ])

    expect(result[0].objects['A-1'].status).toBe('lolzor')
})

test('should accept ignoreChannels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        channelKey1: {
            name: 'channel 1',
            color: '#FFAABB',
            index: 1
        }
    })
    await client.events.channels.setObjects(event.key, {
        channelKey1: ['A-1', 'A-2']
    })

    const result = await client.events.changeObjectStatusInBatch([
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 7.
        new StatusChangeRequest(event.key, ['A-1'], 'lolzor', null, null, null, true)
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
            new StatusChangeRequest(event.key, ['A-1'], 'lolzor', null, null, null, null, null, ['MustBeThisStatus'], null)
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
            new StatusChangeRequest(event.key, ['A-1'], 'lolzor', null, null, null, true, null, null, ['free'])
        ])
        throw new Error('Should have failed')
    } catch (e: any) {
        expect(e.errors.length).toEqual(1)
        expect(e.errors[0].code).toBe('ILLEGAL_STATUS_CHANGE')
    }
})
