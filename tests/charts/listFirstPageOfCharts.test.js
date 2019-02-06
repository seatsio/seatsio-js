const ChartListParams = require('../../src/Charts/ChartListParams.js')

test('should list first page of charts', async () => {
  let chart1 = await client.charts.create()
  let chart2 = await client.charts.create()
  let chart3 = await client.charts.create()

  let page = await client.charts.listFirstPage()
  let chartKeys = page.items.map((chart) => chart.key)

  expect(chartKeys.sort()).toEqual([chart1.key, chart2.key, chart3.key].sort())
})

test('should list first page of charts with filter', async () => {
  let chart1 = await client.charts.create('foo')
  let chart2 = await client.charts.create('foo')
  await client.charts.create('bar')
  let chart4 = await client.charts.create('foo')
  let params = new ChartListParams().withFilter('foo')

  let page = await client.charts.listFirstPage(params)
  let chartKeys = page.items.map((chart) => chart.key)

  expect(chartKeys.sort()).toEqual([chart1.key, chart2.key, chart4.key].sort())
})

test('should list first page of charts with tag', async () => {
  let chart1 = await client.charts.create('foo')
  let chart2 = await client.charts.create('foo')
  let chart3 = await client.charts.create('bar')
  await client.charts.addTag(chart3.key, 'foo')
  let params = new ChartListParams().withTag('foo')

  let page = await client.charts.listFirstPage(params)

  expect(page.items[0].key).toEqual(chart3.key)
})

test('pageSize of list first page of charts with page size', async () => {
  await client.charts.create('foo')
  await client.charts.create('foo')
  let chart3 = await client.charts.create('bar')
  let chart4 = await client.charts.create('foo')

  let page = await client.charts.listFirstPage(null, 2)
  let chartKeys = page.items.map((chart) => chart.key)

  expect(chartKeys.sort()).toEqual([chart3.key, chart4.key].sort())
})

test('should list first page of charts with expanded events', async () => {
  let generatedKeys = []
  for (let i = 0; i < 5; i++) {
    let chart = await client.charts.create(i.toString())
    let event = await client.events.create(chart.key)
    generatedKeys.push(event.key)
  }
  let params = new ChartListParams().withExpandEvents(true)

  let page = await client.charts.listFirstPage(params)
  let eventKeys = page.items.map(chart => chart.events[0].key)

  expect(eventKeys.sort()).toEqual(generatedKeys.sort())
})
