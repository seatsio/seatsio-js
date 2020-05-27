const testUtils = require('../testUtils.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')

test('should change best available object status', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 2, 'lolzor')

    expect(bestAvailableObjs.nextToEachOther).toBe(true)
    expect(bestAvailableObjs.objects.sort()).toEqual(['B-4', 'B-5'])
    expect(bestAvailableObjs.objectDetails).toEqual({
        'B-4': {
            categoryKey: '9',
            categoryLabel: 'Cat1',
            forSale: true,
            label: 'B-4',
            labels: { own: { label: '4', type: 'seat' }, parent: { label: 'B', type: 'row' } },
            objectType: 'seat',
            status: 'lolzor',
            isAccessible: false,
            hasRestrictedView: false,
            isCompanionSeat: false,
            leftNeighbour: 'B-3',
            rightNeighbour: 'B-5'
        },
        'B-5': {
            categoryKey: '9',
            categoryLabel: 'Cat1',
            forSale: true,
            label: 'B-5',
            labels: { own: { label: '5', type: 'seat' }, parent: { label: 'B', type: 'row' } },
            objectType: 'seat',
            status: 'lolzor',
            isAccessible: false,
            hasRestrictedView: false,
            isCompanionSeat: false,
            leftNeighbour: 'B-4',
            rightNeighbour: 'B-6'
        }
    }
    )
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

    const b4Status = await client.events.retrieveObjectStatus(event.key, 'B-4')
    const b5Status = await client.events.retrieveObjectStatus(event.key, 'B-5')
    expect(bestAvailableObjs.objects.sort()).toEqual(['B-4', 'B-5'])
    expect(b4Status.extraData).toEqual(extraData[0])
    expect(b5Status.extraData).toEqual(extraData[1])
})

test('should change best available object status with hold token', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const objectStatus = new ObjectStatus()
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 1, objectStatus.HELD, null, holdToken.holdToken)

    const objStatus = await client.events.retrieveObjectStatus(event.key, bestAvailableObjs.objects[0])
    expect(objStatus.status).toBe(objectStatus.HELD)
    expect(objStatus.holdToken).toBe(holdToken.holdToken)
})

test('should change best available object status with orderId', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 1, 'lolzor', null, null, null, 'anOrder')

    const objStatus = await client.events.retrieveObjectStatus(event.key, bestAvailableObjs.objects[0])
    expect(objStatus.orderId).toBe('anOrder')
})

test('should book best available object with extra data', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const extraData = [{ foo: 'bar' }, { foo: 'baz' }, { foo: 'bar2' }]

    const bestAvailableObjs = await client.events.bookBestAvailable(event.key, 3, null, null, null, null, extraData)

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
    const objectStatus = new ObjectStatus()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()

    const bestAvailableObjs = await client.events.holdBestAvailable(event.key, 1, holdToken.holdToken)

    const objStatus = await client.events.retrieveObjectStatus(event.key, bestAvailableObjs.objects[0])
    expect(objStatus.status).toBe(objectStatus.HELD)
    expect(objStatus.holdToken).toBe(holdToken.holdToken)
})

test('should hold best available object with extra data ', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    const objectStatus = new ObjectStatus()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    const extraData = [{ foo: 'bar' }]

    const bestAvailableObjs = await client.events.holdBestAvailable(event.key, 1, holdToken.holdToken, null, null, null, extraData)

    const objStatus = await client.events.retrieveObjectStatus(event.key, bestAvailableObjs.objects[0])
    expect(objStatus.status).toBe(objectStatus.HELD)
    expect(objStatus.holdToken).toBe(holdToken.holdToken)
})

test('should respect keepExtraData=true', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'B-5', { foo: 'bar' })

    await client.events.changeBestAvailableObjectStatus(event.key, 1, 'someStatus', null, null, null, null, true)

    const status = await client.events.retrieveObjectStatus(event.key, 'B-5')
    expect(status.extraData).toEqual({ foo: 'bar' })
})

test('should respect keepExtraData=false', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'B-5', { foo: 'bar' })

    await client.events.changeBestAvailableObjectStatus(event.key, 1, 'someStatus', null, null, null, null, false)

    const status = await client.events.retrieveObjectStatus(event.key, 'B-5')
    expect(status.extraData).toBeFalsy()
})

test('should respect no keepExtraData', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateExtraData(event.key, 'B-5', { foo: 'bar' })

    await client.events.changeBestAvailableObjectStatus(event.key, 1, 'someStatus', null, null, null, null, false)

    const status = await client.events.retrieveObjectStatus(event.key, 'B-5')
    expect(status.extraData).toBeFalsy()
})
