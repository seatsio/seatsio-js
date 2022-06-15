const testUtils = require('../testUtils.js')
const EventObjectInfo = require('../../src/Events/EventObjectInfo.js')

test('should change best available object status', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 2, 'lolzor')

    expect(bestAvailableObjs.nextToEachOther).toBe(true)
    expect(bestAvailableObjs.objects.sort()).toEqual(['B-4', 'B-5'])
})

test('should change best available object status with categories', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 3, 'lolzor', ['cat2'])

    expect(bestAvailableObjs.objects.sort()).toEqual(['C-4', 'C-5', 'C-6'])
})

test('should change best available object status with extra data', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const extraData = [{ foo: 'bar' }, { foo: 'baz' }]

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 2, 'lolzor', null, null, extraData)

    const objectInfo4 = await client.events.retrieveObjectInfo(event.key, 'B-4')
    const objectInfo5 = await client.events.retrieveObjectInfo(event.key, 'B-5')
    expect(bestAvailableObjs.objects.sort()).toEqual(['B-4', 'B-5'])
    expect(objectInfo4.extraData).toEqual(extraData[0])
    expect(objectInfo5.extraData).toEqual(extraData[1])
})

test('should change best available object status with hold token', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 1, EventObjectInfo.HELD, null, holdToken.holdToken)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, bestAvailableObjs.objects[0])
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
    expect(objectInfo.holdToken).toBe(holdToken.holdToken)
})

test('should change best available object status with orderId', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 1, 'lolzor', null, null, null, null, 'anOrder')

    const objectInfo = await client.events.retrieveObjectInfo(event.key, bestAvailableObjs.objects[0])
    expect(objectInfo.orderId).toBe('anOrder')
})

test('should book best available object with extra data', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const extraData = [{ foo: 'bar' }, { foo: 'baz' }, { foo: 'bar2' }]

    const bestAvailableObjs = await client.events.bookBestAvailable(event.key, 3, null, null, extraData)

    expect(bestAvailableObjs.nextToEachOther).toBe(true)
    expect(bestAvailableObjs.objects).toEqual(['B-4', 'B-5', 'B-6'])
})

test('should book best available object', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bestAvailableObjs = await client.events.bookBestAvailable(event.key, 3)

    expect(bestAvailableObjs.nextToEachOther).toBe(true)
    expect(bestAvailableObjs.objects).toEqual(['B-4', 'B-5', 'B-6'])
})

test('should hold best available object ', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()

    const bestAvailableObjs = await client.events.holdBestAvailable(event.key, 1, holdToken.holdToken)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, bestAvailableObjs.objects[0])
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
    expect(objectInfo.holdToken).toBe(holdToken.holdToken)
})

test('should hold best available object with extra data ', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    const extraData = [{ foo: 'bar' }]

    const bestAvailableObjs = await client.events.holdBestAvailable(event.key, 1, holdToken.holdToken, null, extraData)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, bestAvailableObjs.objects[0])
    expect(objectInfo.status).toBe(EventObjectInfo.HELD)
    expect(objectInfo.holdToken).toBe(holdToken.holdToken)
})

test('should hold best available object with ticket types ', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()

    const bestAvailableObjs = await client.events.holdBestAvailable(event.key, 2, holdToken.holdToken, null, null, ['adult', 'child'])

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, bestAvailableObjs.objects[0])
    expect(objectInfo1.ticketType).toBe('adult')
    const objectInfo2 = await client.events.retrieveObjectInfo(event.key, bestAvailableObjs.objects[1])
    expect(objectInfo2.ticketType).toBe('child')
})

test('should respect keepExtraData=true', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'B-5', { foo: 'bar' })

    await client.events.changeBestAvailableObjectStatus(event.key, 1, 'someStatus', null, null, null, null, null, true)

    const status = await client.events.retrieveObjectInfo(event.key, 'B-5')
    expect(status.extraData).toEqual({ foo: 'bar' })
})

test('should respect keepExtraData=false', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'B-5', { foo: 'bar' })

    await client.events.changeBestAvailableObjectStatus(event.key, 1, 'someStatus', null, null, null, null, null, false)

    const status = await client.events.retrieveObjectInfo(event.key, 'B-5')
    expect(status.extraData).toBeFalsy()
})

test('should respect no keepExtraData', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'B-5', { foo: 'bar' })

    await client.events.changeBestAvailableObjectStatus(event.key, 1, 'someStatus')

    const status = await client.events.retrieveObjectInfo(event.key, 'B-5')
    expect(status.extraData).toBeFalsy()
})

test('should accept channel keys', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        channelKey1: { name: 'channel 1', color: '#FFAABB', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channelKey1: ['B-6'] })

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 1, 'lolzor', null, null, null, null, null, null, null, ['channelKey1'])

    expect(bestAvailableObjs.objects).toEqual(['B-6'])
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

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 1, 'lolzor', null, null, null, null, null, null, true)

    expect(bestAvailableObjs.objects).toEqual(['B-5'])
})
