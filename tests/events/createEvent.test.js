const testUtils = require('../testUtils.js')

test('should check that only chart key is required', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)

  let event = await client.events.create(chartKey)

  expect(event.key).toBeTruthy()
  expect(event.id).toBeTruthy()
  expect(event.chartKey).toBe(chartKey)
  expect(event.bookWholeTables).toBe(false)
  expect(event.supportsBestAvailable).toBe(true)
  expect(event.createdOn).toBeTruthy()
  expect(event.forSaleConfig).toBeFalsy()
  expect(event.updatedOn).toBeFalsy()
})

test('should pass in event key as a create() param', async () => {
  let chart = await client.charts.create()

  let event = await client.events.create(chart.key, 'eventKey')

  expect(event.key).toBe('eventKey')
})

test('should pass in BookWholeTables as a create() param', async () => {
  let chart = await client.charts.create()

  let event = await client.events.create(chart.key, null, false)

  expect(event.key).toBeTruthy()
  expect(event.bookWholeTables).toBe(false)
})

test('should pass in tableBookingModes as a create() param', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChartWithTables(chartKey, user.designerKey)
  let tableBookingModes = { 'T1': 'BY_TABLE', 'T2': 'BY_SEAT' }

  let event = await client.events.create(chartKey, null, tableBookingModes)

  expect(event.key).toBeTruthy()
  expect(event.bookWholeTables).toBe(false)
  expect(event.tableBookingModes).toEqual(tableBookingModes)
})
