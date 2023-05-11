import { TestUtils } from '../TestUtils'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo.js'
import { ObjectProperties } from '../../src/Events/ObjectProperties.js'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'
import { SocialDistancingRuleset } from '../../src/Charts/SocialDistancingRuleset'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const result = await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
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

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status for table seat', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const result = await client.events.changeObjectStatus(event.key, 'T1-1', 'lolzor')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Object.keys(result.objects)).toEqual(['T1-1'])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status for table', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, null, TableBookingConfig.allByTable())

    const result = await client.events.changeObjectStatus(event.key, 'T1', 'lolzor')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Object.keys(result.objects)).toEqual(['T1'])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status with GA', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const result = await client.events.changeObjectStatus(event.key, '34', 'lolzor')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Object.keys(result.objects)).toEqual(['34'])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status with GA and quantity', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const result = await client.events.changeObjectStatus(event.key, {
        objectId: 'GA1',
        quantity: 100
    }, 'myCustomStatus')

    const retrievedStatus = await client.events.retrieveObjectInfo(event.key, 'GA1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Object.keys(result.objects)).toEqual(['GA1'])
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedStatus.numBooked).toBe(100)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedStatus.status).toBe('myCustomStatus')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status with objectId as string', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe('lolzor')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status with objectId inside class', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.changeObjectStatus(event.key, new ObjectProperties('A-1'), 'lolzor')

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe('lolzor')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status with hold token', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()

    // @ts-expect-error TS(2339): Property 'HELD' does not exist on type 'typeof Eve... Remove this comment to see the full error message
    await client.events.changeObjectStatus(event.key, 'A-1', EventObjectInfo.HELD, holdToken.holdToken)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.holdToken).toBe(holdToken.holdToken)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status with OrderId', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor', null, 'order1')

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.orderId).toBe('order1')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should respect keepExtraData=true', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'A-1', { foo: 'bar' })

    await client.events.changeObjectStatus(event.key, ['A-1'], 'someStatus', null, null, true)

    const status = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status.extraData).toEqual({ foo: 'bar' })
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should respect keepExtraData=false', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'A-1', { foo: 'bar' })

    await client.events.changeObjectStatus(event.key, ['A-1'], 'someStatus', null, null, false)

    const status = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status.extraData).toBeFalsy()
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should respect no keepExtraData', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'A-1', { foo: 'bar' })

    await client.events.changeObjectStatus(event.key, ['A-1'], 'someStatus', null, null, false)

    const status = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status.extraData).toBeFalsy()
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
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
        channelKey1: ['A-1', 'A-2']
    })
    await client.events.changeObjectStatus(event.key, ['A-1'], 'someStatus', null, null, null, null, ['channelKey1'])

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe('someStatus')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
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
    await client.events.changeObjectStatus(event.key, ['A-1'], 'someStatus', null, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe('someStatus')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should accept ignoreSocialDistancing', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const ruleset = SocialDistancingRuleset.fixed('ruleset').setDisabledSeats(['A-1']).build()
    await client.charts.saveSocialDistancingRulesets(chartKey, { ruleset })
    await client.events.update(event.key, null, null, null, 'ruleset')

    // @ts-expect-error TS(2339): Property 'BOOKED' does not exist on type 'typeof E... Remove this comment to see the full error message
    await client.events.changeObjectStatus(event.key, ['A-1'], EventObjectInfo.BOOKED, null, null, null, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe(EventObjectInfo.BOOKED)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should accept allowedPreviousStatuses', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    try {
        // @ts-expect-error TS(2339): Property 'BOOKED' does not exist on type 'typeof E... Remove this comment to see the full error message
        await client.events.changeObjectStatus(event.key, ['A-1'], EventObjectInfo.BOOKED, null, null, null, null, null, true, ['MustBeThisStatus'], null)
        throw new Error('Should have failed')
    } catch (e) {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(e.errors.length).toEqual(1)
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(e.errors[0].code).toBe('ILLEGAL_STATUS_CHANGE')
    }
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should accept rejectedPreviousStatuses', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    try {
        // @ts-expect-error TS(2339): Property 'BOOKED' does not exist on type 'typeof E... Remove this comment to see the full error message
        await client.events.changeObjectStatus(event.key, ['A-1'], EventObjectInfo.BOOKED, null, null, null, null, null, true, null, ['free'])
        throw new Error('Should have failed')
    } catch (e) {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(e.errors.length).toEqual(1)
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(e.errors[0].code).toBe('ILLEGAL_STATUS_CHANGE')
    }
})
