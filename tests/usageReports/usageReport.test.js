test('summary for all months', async () => {
    let report = await client.usageReports.summaryForAllMonths()
})

test('details for month', async () => {
    let report = await client.usageReports.detailsForMonth('2019-05')
})

test('details for event in month', async () => {
    let chart = await client.charts.create()
    let event = await client.events.create(chart.key)

    let report = await client.usageReports.detailsForEventInMonth(event.id, '2019-05')
})

test('details for object in event in month', async () => {
    let chart = await client.charts.create()
    let event = await client.events.create(chart.key)

    let report = await client.usageReports.detailsForObjectInEventInMonth('A-1', event.id, '2019-05')
})
