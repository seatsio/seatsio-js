const ChartListParams = require('../../src/Charts/ChartListParams.js')

test('should list charts before a given chart id', async () => {
    let chart1 = await client.charts.create()
    let chart2 = await client.charts.create()
    let chart3 = await client.charts.create()

    let page = await client.charts.listPageBefore(chart1.id)
    let chartKeys = page.items.map((chart) => chart.key)

    expect(chartKeys.sort()).toEqual([chart2.key, chart3.key].sort())
})

test('should list charts before a given chart id with filter', async () => {
    let chart1 = await client.charts.create('foo')
    let chart2 = await client.charts.create('foo')
    await client.charts.create('bar')
    let chart4 = await client.charts.create('foo')

    let params = new ChartListParams().withFilter('foo')
    let page = await client.charts.listPageBefore(chart1.id, params)
    let chartKeys = page.items.map((chart) => chart.key)

    expect(chartKeys.sort()).toEqual([chart2.key, chart4.key].sort())
})

test('should list charts before a given chart id with page size', async () => {
    let chart1 = await client.charts.create('foo')
    let chart2 = await client.charts.create('foo')
    let chart3 = await client.charts.create('bar')
    await client.charts.create('foo')

    let page = await client.charts.listPageBefore(chart1.id, null, 2)
    let chartKeys = page.items.map((chart) => chart.key)

    expect(chartKeys.sort()).toEqual([chart2.key, chart3.key].sort())
})
