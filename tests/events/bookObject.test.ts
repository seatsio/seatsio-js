import { EventObjectInfo } from '../../src/Events/EventObjectInfo'
import { TestUtils } from '../testUtils'
import { IDs } from '../../src/Common/IDs'
import { CreateEventParams } from '../../src/Events/CreateEventParams'
import { Channel } from '../../src/Events/Channel'

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
    expect(retrievedObjectStatuses[0].status).toEqual(EventObjectInfo.BOOKED)
    expect(retrievedObjectStatuses[1].status).toEqual(EventObjectInfo.BOOKED)
    expect(Object.keys(bookRes.objects).sort()).toEqual(['A-1', 'A-2'])
})

test('should book an object with quantity', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.book(event.key, { objectId: 'GA1', quantity: 100 })

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'GA1')
    expect(objectInfo.status).toEqual(EventObjectInfo.BOOKED)
    expect(objectInfo.numBooked).toEqual(100)
})

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
    expect(retrievedObjectStatuses[0].status).toEqual(EventObjectInfo.BOOKED)
    expect(retrievedObjectStatuses[1].status).toEqual(EventObjectInfo.BOOKED)
    expect(bookRes.objects['Section A-A-1'].entrance).toBe('Entrance 1')
    expect(bookRes.objects['Section A-A-1'].section).toBe('Section A')
    expect(bookRes.objects['Section A-A-1'].labels).toEqual(TestUtils.someLabels('1', 'seat', 'A', 'row', 'Section A'))
    expect(bookRes.objects['Section A-A-1'].ids).toEqual(new IDs('1', 'A', 'Section A'))
})

test('should hold and then book, check hold token exists', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'A-1', holdToken.holdToken)

    await client.events.book(event.key, 'A-1', holdToken.holdToken)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.BOOKED)
    expect(objectInfo.holdToken).toBeUndefined()
})

test('should check booking with orderId', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.book(event.key, 'A-1', null, 'order1')

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.orderId).toBe('order1')
})

test('should keep extra data', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'A-1', { foo: 'bar' })

    await client.events.book(event.key, ['A-1'], null, null, true)

    const status = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(status.extraData).toEqual({ foo: 'bar' })
})

test('should accept channel keys', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channelKey1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1'] })
    ]))

    await client.events.book(event.key, ['A-1'], null, null, null, null, ['channelKey1'])

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.BOOKED)
})

test('should accept ignoreChannels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channel1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1'] })
    ]))

    await client.events.book(event.key, ['A-1'], null, null, null, true)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.status).toBe(EventObjectInfo.BOOKED)
})
