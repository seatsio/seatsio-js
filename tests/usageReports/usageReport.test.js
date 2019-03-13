test('usage report for all months', async () => {
  let report = await client.usageReports.allMonths()

  expect(report).not.toBeFalsy()
})

test('usage report for month', async () => {
  let report = await client.usageReports.month('2019-03')

  expect(report).not.toBeFalsy()
})

test('usage report for event in month', async () => {
  let chart = await client.charts.create()
  let event = await client.events.create(chart.key)

  let report = await client.usageReports.eventInMonth(event.key, '2019-03')

  expect(report).not.toBeFalsy()
})

test('usage report for object in event in month', async () => {
  let chart = await client.charts.create()
  let event = await client.events.create(chart.key)

  let report = await client.usageReports.objectInEventInMonth('A-1', event.key, '2019-03')

  expect(report).not.toBeFalsy()
})
