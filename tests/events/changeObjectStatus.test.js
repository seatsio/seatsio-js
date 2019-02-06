const testUtils = require('../testUtils.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')
const ObjectProperties = require('../../src/Events/ObjectProperties.js')

test('should change object status', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)

  let result = await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')

  expect(result.objects).toEqual({
    "A-1": {
      "categoryKey": "9",
      "categoryLabel": "Cat1",
      "forSale": true,
      "label": "A-1",
      "labels": {"own": {"label": "1", "type": "seat"}, "parent": {"label": "A", "type": "row"}},
      "objectType": "seat",
      "status": "lolzor"
    }
  })
})

test('should change object status for table seat', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChartWithTables(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)

  let result = await client.events.changeObjectStatus(event.key, 'T1-1', 'lolzor')

  expect(Object.keys(result.objects)).toEqual(['T1-1'])
})

test('should change object status for table', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChartWithTables(chartKey, user.designerKey)
  let event = await client.events.create(chartKey, null, true)

  let result = await client.events.changeObjectStatus(event.key, 'T1', 'lolzor')

  expect(Object.keys(result.objects)).toEqual(['T1'])
})

test('should change object status with GA', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)

  let result = await client.events.changeObjectStatus(event.key, '34', 'lolzor')

  expect(Object.keys(result.objects)).toEqual(['34'])
})

test('should change object status with GA and quantity', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)

  let result = await client.events.changeObjectStatus(event.key, {
    "objectId": "GA1",
    "quantity": 100
  }, 'myCustomStatus')

  let retrievedStatus = await client.events.retrieveObjectStatus(event.key, 'GA1')
  expect(Object.keys(result.objects)).toEqual(['GA1'])
  expect(retrievedStatus.quantity).toBe(100)
  expect(retrievedStatus.status).toBe('myCustomStatus')
})

test('should change object status with objectId as string', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)

  await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')

  let objStatus = await client.events.retrieveObjectStatus(event.key, "A-1")
  expect(objStatus.status).toBe('lolzor')
})

test('should change object status with objectId inside class', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)

  await client.events.changeObjectStatus(event.key, new ObjectProperties('A-1'), 'lolzor')

  let objStatus = await client.events.retrieveObjectStatus(event.key, "A-1")
  expect(objStatus.status).toBe('lolzor')
})

test('should change object status with hold token', async () => {
  let chartKey = testUtils.getChartKey()
  let objectStatus = new ObjectStatus()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let holdToken = await client.holdTokens.create()

  await client.events.changeObjectStatus(event.key, 'A-1', objectStatus.HELD, holdToken.holdToken)

  let objStatus = await client.events.retrieveObjectStatus(event.key, "A-1")
  expect(objStatus.status).toBe(objectStatus.HELD)
  expect(objStatus.holdToken).toBe(holdToken.holdToken)
})

test('should change object status with OrderId', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)

  await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor', null, "order1")

  let objStatus = await client.events.retrieveObjectStatus(event.key, "A-1")
  expect(objStatus.orderId).toBe('order1')
})