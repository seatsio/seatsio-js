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
        new StatusChangeRequest(event1.key, ['A-1'], 'lolzor'),
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
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
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
        new StatusChangeRequest(event.key, ['A-1'], 'lolzor', null, null, null, null, ['channelKey1'])
    ])

    expect(result[0].objects['A-1'].status).toBe('lolzor')
})

test('should accept ignoreChannels', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
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
        new StatusChangeRequest(event.key, ['A-1'], 'lolzor', null, null, null, true)
    ])

    expect(result[0].objects['A-1'].status).toBe('lolzor')
})

test('should accept allowedPreviousStatuses', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    try {
        await client.events.changeObjectStatusInBatch([
            new StatusChangeRequest(event.key, ['A-1'], 'lolzor', null, null, null, null, null, ['MustBeThisStatus'], null)
        ])
        throw new Error('Should have failed')
    } catch (e) {
        expect(e.errors.length).toEqual(1)
        expect(e.errors[0].code).toBe('ILLEGAL_STATUS_CHANGE')
    }
})

test('should accept rejectedPreviousStatuses', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    try {
        await client.events.changeObjectStatusInBatch([
            new StatusChangeRequest(event.key, ['A-1'], 'lolzor', null, null, null, true, null, null, ['free'])
        ])
        throw new Error('Should have failed')
    } catch (e) {
        expect(e.errors.length).toEqual(1)
        expect(e.errors[0].code).toBe('ILLEGAL_STATUS_CHANGE')
    }
})
