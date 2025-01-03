import { EventObjectInfo } from '../../src/Events/EventObjectInfo'
import { TestUtils } from '../testUtils'
import { CreateEventParams } from '../../src/Events/CreateEventParams'
import { Channel } from '../../src/Events/Channel'
import { BestAvailableParams } from '../../src/Events/BestAvailableParams'

test('should change best available object status', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, new BestAvailableParams().withNumber(2), 'lolzor')

    expect(bestAvailableObjs.nextToEachOther).toBe(true)
    expect(bestAvailableObjs.objects.sort()).toEqual(['A-4', 'A-5'])
})

test('should change best available object status with categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, new BestAvailableParams().withNumber(3).withCategories(['cat2']), 'lolzor')

    expect(bestAvailableObjs.objects.sort()).toEqual(['C-4', 'C-5', 'C-6'])
})

test('should change best available object status with zone', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithZones(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bestAvailableObjsFinishline = await client.events.changeBestAvailableObjectStatus(event.key, new BestAvailableParams().withNumber(1).withZone('finishline'), 'lolzor')
    expect(bestAvailableObjsFinishline.objects.sort()).toEqual(['Goal Stand 4-A-1'])

    const bestAvailableObjsMidtrack = await client.events.changeBestAvailableObjectStatus(event.key, new BestAvailableParams().withNumber(1).withZone('midtrack'), 'lolzor')
    expect(bestAvailableObjsMidtrack.objects.sort()).toEqual(['MT3-A-139'])
})

test('should change best available object status with extra data', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const extraData = [{ foo: 'bar' }, { foo: 'baz' }]

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, new BestAvailableParams().withNumber(2).withExtraData(extraData), 'lolzor')

    const objectInfo4 = await client.events.retrieveObjectInfo(event.key, 'A-4')
    const objectInfo5 = await client.events.retrieveObjectInfo(event.key, 'A-5')
    expect(bestAvailableObjs.objects.sort()).toEqual(['A-4', 'A-5'])
    expect(objectInfo4.extraData).toEqual(extraData[0])
    expect(objectInfo5.extraData).toEqual(extraData[1])
})

test('should change best available object status with hold token', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, new BestAvailableParams().withNumber(1), EventObjectInfo.HELD, holdToken.holdToken)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, bestAvailableObjs.objects[0])
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
    expect(objectInfo.holdToken).toBe(holdToken.holdToken)
})

test('should change best available object status with orderId', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, new BestAvailableParams().withNumber(1), 'lolzor', undefined, 'anOrder')

    const objectInfo = await client.events.retrieveObjectInfo(event.key, bestAvailableObjs.objects[0])
    expect(objectInfo.orderId).toBe('anOrder')
})

test('should book best available object with extra data', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const extraData = [{ foo: 'bar' }, { foo: 'baz' }, { foo: 'bar2' }]

    const bestAvailableObjs = await client.events.bookBestAvailable(event.key, new BestAvailableParams().withNumber(3).withExtraData(extraData))

    expect(bestAvailableObjs.nextToEachOther).toBe(true)
    expect(bestAvailableObjs.objects).toEqual(['A-4', 'A-5', 'A-6'])
})

test('should book best available while leaving orphan seats', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, ['A-4', 'A-5'])

    const bestAvailableObjs = await client.events.bookBestAvailable(event.key, new BestAvailableParams().withNumber(2).withTryToPreventOrphanSeats(false))

    expect(bestAvailableObjs.objects).toEqual(['A-2', 'A-3'])
})

test('should book best available objects', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bestAvailableObjs = await client.events.bookBestAvailable(event.key, new BestAvailableParams().withNumber(3))

    expect(bestAvailableObjs.nextToEachOther).toBe(true)
    expect(bestAvailableObjs.objects).toEqual(['A-4', 'A-5', 'A-6'])
})

test('should hold best available object ', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()

    const bestAvailableObjs = await client.events.holdBestAvailable(event.key, new BestAvailableParams().withNumber(1), holdToken.holdToken)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, bestAvailableObjs.objects[0])
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
    expect(objectInfo.holdToken).toBe(holdToken.holdToken)
})

test('should hold best available object with extra data ', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    const extraData = [{ foo: 'bar' }]

    const bestAvailableObjs = await client.events.holdBestAvailable(event.key, new BestAvailableParams().withNumber(1).withExtraData(extraData), holdToken.holdToken)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, bestAvailableObjs.objects[0])
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
    expect(objectInfo.holdToken).toBe(holdToken.holdToken)
})

test('should hold best available object with ticket types ', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()

    const bestAvailableObjs = await client.events.holdBestAvailable(event.key, new BestAvailableParams().withNumber(2).withTicketTypes(['adult', 'child']), holdToken.holdToken)

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, bestAvailableObjs.objects[0])
    expect(objectInfo1.ticketType).toBe('adult')
    const objectInfo2 = await client.events.retrieveObjectInfo(event.key, bestAvailableObjs.objects[1])
    expect(objectInfo2.ticketType).toBe('child')
})

test('should respect keepExtraData=true', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'A-5', { foo: 'bar' })

    await client.events.changeBestAvailableObjectStatus(event.key, new BestAvailableParams().withNumber(1), 'someStatus', undefined, undefined, true)

    const status = await client.events.retrieveObjectInfo(event.key, 'A-5')
    expect(status.extraData).toEqual({ foo: 'bar' })
})

test('should respect keepExtraData=false', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'A-5', { foo: 'bar' })

    await client.events.changeBestAvailableObjectStatus(event.key, new BestAvailableParams().withNumber(1), 'someStatus', undefined, undefined, false)

    const status = await client.events.retrieveObjectInfo(event.key, 'A-5')
    expect(status.extraData).toBeUndefined()
})

test('should respect no keepExtraData', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'A-5', { foo: 'bar' })

    await client.events.changeBestAvailableObjectStatus(event.key, new BestAvailableParams().withNumber(1), 'someStatus')

    const status = await client.events.retrieveObjectInfo(event.key, 'A-5')
    expect(status.extraData).toBeUndefined()
})

test('should accept channel keys', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channelKey1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-6'] })
    ]))

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, new BestAvailableParams().withNumber(1), 'lolzor', undefined, undefined, undefined, undefined, ['channelKey1'])

    expect(bestAvailableObjs.objects).toEqual(['A-6'])
})

test('should accept ignoreChannels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channel1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1'] })
    ]))

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, new BestAvailableParams().withNumber(1), 'lolzor', undefined, undefined, undefined, true)

    expect(bestAvailableObjs.objects).toEqual(['A-5'])
})

test('accessible seats', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, new BestAvailableParams().withNumber(3).withAccessibleSeats(1), 'lolzor')

    expect(bestAvailableObjs.nextToEachOther).toBe(true)
    expect(bestAvailableObjs.objects.sort()).toEqual(['A-6', 'A-7', 'A-8'])
})
