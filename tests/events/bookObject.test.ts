import { EventObjectInfo } from '../../src/Events/EventObjectInfo.js'
import { TestUtils } from '../TestUtils'
import { SocialDistancingRuleset } from '../../src/Charts/SocialDistancingRuleset'
import { IDs } from '../../src/Common/IDs'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should book an object', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bookRes = await client.events.book(event.key, ['A-1', 'A-2'])

    const promises = [
        client.events.retrieveObjectInfo(event.key, 'A-1'),
        client.events.retrieveObjectInfo(event.key, 'A-2')
    ]
    const retrievedObjectStatuses = await Promise.all(promises)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedObjectStatuses[0].status).toEqual(EventObjectInfo.BOOKED)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedObjectStatuses[1].status).toEqual(EventObjectInfo.BOOKED)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Object.keys(bookRes.objects).sort()).toEqual(['A-1', 'A-2'])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should book an object with quantity', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.book(event.key, { objectId: 'GA1', quantity: 100 })

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'GA1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toEqual(EventObjectInfo.BOOKED)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.numBooked).toEqual(100)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should book an object with sections', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithSections(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bookRes = await client.events.book(event.key, ['Section A-A-1', 'Section A-A-2'])

    const promises = [
        client.events.retrieveObjectInfo(event.key, 'Section A-A-1'),
        client.events.retrieveObjectInfo(event.key, 'Section A-A-2')
    ]
    const retrievedObjectStatuses = await Promise.all(promises)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedObjectStatuses[0].status).toEqual(EventObjectInfo.BOOKED)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedObjectStatuses[1].status).toEqual(EventObjectInfo.BOOKED)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(bookRes.objects['Section A-A-1'].entrance).toBe('Entrance 1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(bookRes.objects['Section A-A-1'].section).toBe('Section A')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(bookRes.objects['Section A-A-1'].labels).toEqual(TestUtils.someLabels('1', 'seat', 'A', 'row', 'Section A'))
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(bookRes.objects['Section A-A-1'].ids).toEqual(new IDs('1', 'A', 'Section A'))
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should hold and then book, check hold token exists', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'A-1', holdToken.holdToken)

    await client.events.book(event.key, 'A-1', holdToken.holdToken)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe(EventObjectInfo.BOOKED)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.holdToken).toBeFalsy()
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should check booking with orderId', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.book(event.key, 'A-1', null, 'order1')

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.orderId).toBe('order1')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should keep extra data', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'A-1', { foo: 'bar' })

    await client.events.book(event.key, ['A-1'], null, null, true)

    const status = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status.extraData).toEqual({ foo: 'bar' })
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should accept channel keys', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        channelKey1: { name: 'channel 1', color: '#FFAABB', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channelKey1: ['A-1'] })

    await client.events.book(event.key, ['A-1'], null, null, null, null, ['channelKey1'])

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe(EventObjectInfo.BOOKED)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should accept ignoreChannels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        channelKey1: { name: 'channel 1', color: '#FFAABB', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channelKey1: ['A-1'] })

    await client.events.book(event.key, ['A-1'], null, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe(EventObjectInfo.BOOKED)
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

    await client.events.book(event.key, ['A-1'], null, null, null, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toBe(EventObjectInfo.BOOKED)
})
