const testUtils = require('../testUtils.js')
const EventObjectInfo = require('../../src/Events/EventObjectInfo.js')
const ObjectProperties = require('../../src/Events/ObjectProperties.js')
const TableBookingConfig = require('../../src/Events/TableBookingConfig')
const SocialDistancingRuleset = require('../../src/Charts/SocialDistancingRuleset')

test('should change object status', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const result = await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')

    expect(result.objects).toEqual({
        'A-1': {
            categoryKey: '9',
            categoryLabel: 'Cat1',
            forSale: true,
            label: 'A-1',
            labels: { own: { label: '1', type: 'seat' }, parent: { label: 'A', type: 'row' } },
            ids: { own: '1', parent: 'A', section: null },
            objectType: 'seat',
            status: 'lolzor',
            isAccessible: false,
            hasRestrictedView: false,
            isCompanionSeat: false,
            rightNeighbour: 'A-2',
            isAvailable: false,
            availabilityReason: 'lolzor',
            isDisabledBySocialDistancing: false,
            distanceToFocalPoint: 79.43847425150014
        }
    })
})

test('should change object status for table seat', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const result = await client.events.changeObjectStatus(event.key, 'T1-1', 'lolzor')

    expect(Object.keys(result.objects)).toEqual(['T1-1'])
})

test('should change object status for table', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, null, TableBookingConfig.allByTable())

    const result = await client.events.changeObjectStatus(event.key, 'T1', 'lolzor')

    expect(Object.keys(result.objects)).toEqual(['T1'])
})

test('should change object status with GA', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const result = await client.events.changeObjectStatus(event.key, '34', 'lolzor')

    expect(Object.keys(result.objects)).toEqual(['34'])
})

test('should change object status with GA and quantity', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const result = await client.events.changeObjectStatus(event.key, {
        objectId: 'GA1',
        quantity: 100
    }, 'myCustomStatus')

    const retrievedStatus = await client.events.retrieveObjectInfo(event.key, 'GA1')
    expect(Object.keys(result.objects)).toEqual(['GA1'])
    expect(retrievedStatus.numBooked).toBe(100)
    expect(retrievedStatus.status).toBe('myCustomStatus')
})

test('should change object status with objectId as string', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe('lolzor')
})

test('should change object status with objectId inside class', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.changeObjectStatus(event.key, new ObjectProperties('A-1'), 'lolzor')

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe('lolzor')
})

test('should change object status with hold token', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()

    await client.events.changeObjectStatus(event.key, 'A-1', EventObjectInfo.HELD, holdToken.holdToken)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
    expect(objectInfo.holdToken).toBe(holdToken.holdToken)
})

test('should change object status with OrderId', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor', null, 'order1')

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.orderId).toBe('order1')
})

test('should respect keepExtraData=true', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'A-1', { foo: 'bar' })

    await client.events.changeObjectStatus(event.key, ['A-1'], 'someStatus', null, null, true)

    const status = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(status.extraData).toEqual({ foo: 'bar' })
})

test('should respect keepExtraData=false', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'A-1', { foo: 'bar' })

    await client.events.changeObjectStatus(event.key, ['A-1'], 'someStatus', null, null, false)

    const status = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(status.extraData).toBeFalsy()
})

test('should respect no keepExtraData', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'A-1', { foo: 'bar' })

    await client.events.changeObjectStatus(event.key, ['A-1'], 'someStatus', null, null, false)

    const status = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(status.extraData).toBeFalsy()
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
        channelKey1: ['A-1', 'A-2']
    })
    await client.events.changeObjectStatus(event.key, ['A-1'], 'someStatus', null, null, null, null, ['channelKey1'])

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe('someStatus')
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
    await client.events.changeObjectStatus(event.key, ['A-1'], 'someStatus', null, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe('someStatus')
})

test('should accept ignoreSocialDistancing', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const ruleset = SocialDistancingRuleset.fixed('ruleset').setDisabledSeats(['A-1']).build()
    await client.charts.saveSocialDistancingRulesets(chartKey, { ruleset })
    await client.events.update(event.key, null, null, null, 'ruleset')

    await client.events.changeObjectStatus(event.key, ['A-1'], EventObjectInfo.BOOKED, null, null, null, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.BOOKED)
})

test('should accept allowedPreviousStatuses', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    try {
        await client.events.changeObjectStatus(event.key, ['A-1'], EventObjectInfo.BOOKED, null, null, null, null, null, true, ['MustBeThisStatus'], null)
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
        await client.events.changeObjectStatus(event.key, ['A-1'], EventObjectInfo.BOOKED, null, null, null, null, null, true, null, ['free'])
        throw new Error('Should have failed')
    } catch (e) {
        expect(e.errors.length).toEqual(1)
        expect(e.errors[0].code).toBe('ILLEGAL_STATUS_CHANGE')
    }
})
