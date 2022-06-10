const testUtils = require('../testUtils.js')
const EventObjectInfo = require('../../src/Events/EventObjectInfo.js')
const SocialDistancingRuleset = require('../../src/Charts/SocialDistancingRuleset')
const { IDs } = require('../../src/Common/IDs')

test('should book an object', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bookRes = await client.events.book(event.key, ['A-1', 'A-2'])

    const promises = [
        client.events.retrieveObjectInfo(event.key, 'A-1'),
        client.events.retrieveObjectInfo(event.key, 'A-2')
    ]
    const retrievedObjectStatuses = await Promise.all(promises)
    expect(retrievedObjectStatuses[0].status).toEqual(EventObjectInfo.BOOKED)
    expect(retrievedObjectStatuses[1].status).toEqual(EventObjectInfo.BOOKED)
    expect(Object.keys(bookRes.objects).sort()).toEqual(['A-1', 'A-2'])
})

test('should book an object with quantity', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.book(event.key, { objectId: 'GA1', quantity: 100 })

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'GA1')
    expect(objectInfo.status).toEqual(EventObjectInfo.BOOKED)
    expect(objectInfo.numBooked).toEqual(100)
})

test('should book an object with sections', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithSections(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bookRes = await client.events.book(event.key, ['Section A-A-1', 'Section A-A-2'])

    const promises = [
        client.events.retrieveObjectInfo(event.key, 'Section A-A-1'),
        client.events.retrieveObjectInfo(event.key, 'Section A-A-2')
    ]
    const retrievedObjectStatuses = await Promise.all(promises)
    expect(retrievedObjectStatuses[0].status).toEqual(EventObjectInfo.BOOKED)
    expect(retrievedObjectStatuses[1].status).toEqual(EventObjectInfo.BOOKED)
    expect(bookRes.objects['Section A-A-1'].entrance).toBe('Entrance 1')
    expect(bookRes.objects['Section A-A-1'].section).toBe('Section A')
    expect(bookRes.objects['Section A-A-1'].labels).toEqual(testUtils.someLabels('1', 'seat', 'A', 'row', 'Section A'))
    expect(bookRes.objects['Section A-A-1'].ids).toEqual(new IDs('1', 'A', 'Section A'))
})

test('should hold and then book, check hold token exists', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'A-1', holdToken.holdToken)

    await client.events.book(event.key, 'A-1', holdToken.holdToken)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.BOOKED)
    expect(objectInfo.holdToken).toBeFalsy()
})

test('should check booking with orderId', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.book(event.key, 'A-1', null, 'order1')

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.orderId).toBe('order1')
})

test('should keep extra data', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'A-1', { foo: 'bar' })

    await client.events.book(event.key, ['A-1'], null, null, true)

    const status = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(status.extraData).toEqual({ foo: 'bar' })
})

test('should accept channel keys', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        channelKey1: { name: 'channel 1', color: '#FFAABB', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channelKey1: ['A-1'] })

    await client.events.book(event.key, ['A-1'], null, null, null, null, ['channelKey1'])

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.BOOKED)
})

test('should accept ignoreChannels', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        channelKey1: { name: 'channel 1', color: '#FFAABB', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channelKey1: ['A-1'] })

    await client.events.book(event.key, ['A-1'], null, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.BOOKED)
})

test('should accept ignoreSocialDistancing', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const ruleset = SocialDistancingRuleset.fixed('ruleset').setDisabledSeats(['A-1']).build()
    await client.charts.saveSocialDistancingRulesets(chartKey, { ruleset })
    await client.events.update(event.key, null, null, null, 'ruleset')

    await client.events.book(event.key, ['A-1'], null, null, null, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.BOOKED)
})
