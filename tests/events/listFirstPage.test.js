const testUtils = require('../testUtils.js')

test('should list events in first page', async () => {
  let chart = await client.charts.create()
  let eventPromises = testUtils.createArray(20, () => client.events.create(chart.key))
  let events = await Promise.all(eventPromises)

  let page = await client.events.listFirstPage()

  let retrievedEventKeys = page.items.map((event) => event.key)
  expect(retrievedEventKeys.sort()).toEqual(events.map(e => e.key).sort())
})

test('should list events in first page with page size', async () => {
  let chart = await client.charts.create()
  let eventPromises = testUtils.createArray(17, () => client.events.create(chart.key))
  await Promise.all(eventPromises)
  let event18 = await client.events.create(chart.key)
  let event19 = await client.events.create(chart.key)
  let event20 = await client.events.create(chart.key)

  let page = await client.events.listFirstPage(3)

  let retrievedEventKeys = page.items.map((event) => event.key)
  expect(retrievedEventKeys.length).toBe(3)
  expect(retrievedEventKeys).toEqual([event20.key, event19.key, event18.key])
})
