const testUtils = require('../testUtils.js')

test('should list all charts in archive', async () => {
  let chart1 = await client.charts.create()
  let chart2 = await client.charts.create()
  await client.charts.create()
  let archivedChartKeys = []
  await client.charts.moveToArchive(chart1.key)
  await client.charts.moveToArchive(chart2.key)

  for await (let chart of client.charts.archive.all()) {
    archivedChartKeys.push(chart.key)
  }

  expect(archivedChartKeys.sort()).toEqual([chart1.key, chart2.key].sort())
})

test('get archived charts (above 100 limit)', async () => {
  let chartPromises = testUtils.createArray(120, async () => {
    let chart = await client.charts.create()
    await client.charts.moveToArchive(chart.key)
    return chart
  })
  let charts = await Promise.all(chartPromises)

  let archivedChartKeys = []
  for await (let chart of client.charts.archive.all()) {
    archivedChartKeys.push(chart.key)
  }

  expect(archivedChartKeys.sort()).toEqual(charts.map(c => c.key).sort())
})

test('get first page of archived charts', async () => {
  let chartPromises = testUtils.createArray(10, async () => {
    let chart = await client.charts.create()
    await client.charts.moveToArchive(chart.key)
    return chart
  })
  let charts = await Promise.all(chartPromises)

  let firstPage = await client.charts.listArchiveFirstPage()

  expect(firstPage.items.length).toBe(10)
  expect(firstPage.items.map(c => c.key).sort()).toEqual(charts.map(c => c.key).sort())
})

test('get first page of archived charts with page size', async () => {
  let chart1 = await client.charts.create()
  await client.charts.moveToArchive(chart1.key)
  let chart2 = await client.charts.create()
  await client.charts.moveToArchive(chart2.key)
  let chart3 = await client.charts.create()
  await client.charts.moveToArchive(chart3.key)

  let firstPage = await client.charts.listArchiveFirstPage(2)

  expect(firstPage.items.length).toBe(2)
  expect(firstPage.items.map(c => c.key).sort()).toEqual([chart2.key, chart3.key].sort())
})

test('get page after given archived charts id', async () => {
  let chart1 = await client.charts.create()
  await client.charts.moveToArchive(chart1.key)
  let chart2 = await client.charts.create()
  await client.charts.moveToArchive(chart2.key)
  let chart3 = await client.charts.create()
  await client.charts.moveToArchive(chart3.key)

  let page = await client.charts.listArchivePageAfter(chart3.id)

  expect(page.items.length).toBe(2)
  expect(page.previousPageEndsBefore).toEqual(chart2.id + '')
  expect(page.items.map(c => c.key).sort()).toEqual([chart1.key, chart2.key].sort())
})

test('get page after given archived charts id with page size', async () => {
  let chart1 = await client.charts.create()
  await client.charts.moveToArchive(chart1.key)
  let chart2 = await client.charts.create()
  await client.charts.moveToArchive(chart2.key)
  let chart3 = await client.charts.create()
  await client.charts.moveToArchive(chart3.key)

  let page = await client.charts.listArchivePageAfter(chart3.id, 1)

  expect(page.items.length).toBe(1)
  expect(page.previousPageEndsBefore).toEqual(chart2.id + '')
  expect(page.items[0].key).toBe(chart2.key)
})

test('get page before given archived charts id', async () => {
  let chart1 = await client.charts.create()
  await client.charts.moveToArchive(chart1.key)
  let chart2 = await client.charts.create()
  await client.charts.moveToArchive(chart2.key)
  let chart3 = await client.charts.create()
  await client.charts.moveToArchive(chart3.key)

  let page = await client.charts.listArchivePageBefore(chart1.id)

  expect(page.items.length).toBe(2)
  expect(page.nextPageStartsAfter).toEqual(chart2.id + '')
  expect(page.items.map(c => c.key).sort()).toEqual([chart2.key, chart3.key].sort())
})

test('get page after given archived charts id with page size', async () => {
  let chart1 = await client.charts.create()
  await client.charts.moveToArchive(chart1.key)
  let chart2 = await client.charts.create()
  await client.charts.moveToArchive(chart2.key)
  let chart3 = await client.charts.create()
  await client.charts.moveToArchive(chart3.key)

  let page = await client.charts.listArchivePageBefore(chart1.id, 1)

  expect(page.items.length).toBe(1)
  expect(page.previousPageEndsBefore).toEqual(chart2.id + '')
  expect(page.items[0].key).toBe(chart2.key)
})
