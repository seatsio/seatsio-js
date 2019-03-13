const testUtils = require('../testUtils.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')

test('should change best available object status', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)

  let bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 2, 'lolzor')

  expect(bestAvailableObjs.nextToEachOther).toBe(true)
  expect(bestAvailableObjs.objects.sort()).toEqual(['B-4', 'B-5'])
  expect(bestAvailableObjs.objectDetails).toEqual({
    'B-4': {
      'categoryKey': '9',
      'categoryLabel': 'Cat1',
      'forSale': true,
      'label': 'B-4',
      'labels': { 'own': { 'label': '4', 'type': 'seat' }, 'parent': { 'label': 'B', 'type': 'row' } },
      'objectType': 'seat',
      'status': 'lolzor'
    },
    'B-5': {
      'categoryKey': '9',
      'categoryLabel': 'Cat1',
      'forSale': true,
      'label': 'B-5',
      'labels': { 'own': { 'label': '5', 'type': 'seat' }, 'parent': { 'label': 'B', 'type': 'row' } },
      'objectType': 'seat',
      'status': 'lolzor'
    }
  }
  )
})

test('should change best available object status with categories', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 3, 'lolzor', ['cat2'])

  expect(bestAvailableObjs.objects.sort()).toEqual(['C-4', 'C-5', 'C-6'])
})

test('should change best available object status with extra data', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let extraData = [{ 'foo': 'bar' }, { 'foo': 'baz' }]

  let bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 2, 'lolzor', null, null, extraData)

  let b4Status = await client.events.retrieveObjectStatus(event.key, 'B-4')
  let b5Status = await client.events.retrieveObjectStatus(event.key, 'B-5')
  expect(bestAvailableObjs.objects.sort()).toEqual(['B-4', 'B-5'])
  expect(b4Status.extraData).toEqual(extraData[0])
  expect(b5Status.extraData).toEqual(extraData[1])
})

test('should change best available object status with hold token', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let objectStatus = new ObjectStatus()
  let event = await client.events.create(chartKey)
  let holdToken = await client.holdTokens.create()

  let bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 1, objectStatus.HELD, null, holdToken.holdToken)

  let objStatus = await client.events.retrieveObjectStatus(event.key, bestAvailableObjs.objects[0])
  expect(objStatus.status).toBe(objectStatus.HELD)
  expect(objStatus.holdToken).toBe(holdToken.holdToken)
})

test('should change best available object status with orderId', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)

  let bestAvailableObjs = await client.events.changeBestAvailableObjectStatus(event.key, 1, 'lolzor', null, null, null, 'anOrder')

  let objStatus = await client.events.retrieveObjectStatus(event.key, bestAvailableObjs.objects[0])
  expect(objStatus.orderId).toBe('anOrder')
})

test('should book best available object ', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)

  let bestAvailableObjs = await client.events.bookBestAvailable(event.key, 3)

  expect(bestAvailableObjs.nextToEachOther).toBe(true)
  expect(bestAvailableObjs.objects).toEqual(['B-4', 'B-5', 'B-6'])
})

test('should hold best available object ', async () => {
  let chartKey = testUtils.getChartKey()
  let objectStatus = new ObjectStatus()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let holdToken = await client.holdTokens.create()

  let bestAvailableObjs = await client.events.holdBestAvailable(event.key, 1, holdToken.holdToken)

  let objStatus = await client.events.retrieveObjectStatus(event.key, bestAvailableObjs.objects[0])
  expect(objStatus.status).toBe(objectStatus.HELD)
  expect(objStatus.holdToken).toBe(holdToken.holdToken)
})
