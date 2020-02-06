const ChartListParams = require('../../src/Charts/ChartListParams.js')
const testUtils = require('../testUtils.js')

test('should list first page of charts', async () => {
    let promises = [
        client.charts.create(),
        client.charts.create(),
        client.charts.create()
    ]
    let charts = await Promise.all(promises)

    let page = await client.charts.listFirstPage()
    let chartKeys = page.items.map((chart) => chart.key)

    expect(chartKeys.sort()).toEqual([charts[0].key, charts[1].key, charts[2].key].sort())
})

test('should list first page of charts with filter', async () => {
    let promises = [
        client.charts.create('foo'),
        client.charts.create('foo'),
        client.charts.create('bar'),
        client.charts.create('foo')
    ]
    let charts = await Promise.all(promises)
    let params = new ChartListParams().withFilter('foo')

    let page = await client.charts.listFirstPage(params)
    let chartKeys = page.items.map((chart) => chart.key)

    expect(chartKeys.sort()).toEqual([charts[0].key, charts[1].key, charts[3].key].sort())
})

test('should list first page of charts with tag', async () => {
    let promises = [
        client.charts.create('foo'),
        client.charts.create('foo'),
        client.charts.create('bar')
    ]
    let charts = await Promise.all(promises)
    await client.charts.addTag(charts[2].key, 'foo')
    let params = new ChartListParams().withTag('foo')

    let page = await client.charts.listFirstPage(params)

    expect(page.items[0].key).toEqual(charts[2].key)
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
    let i = 0
    let promises = testUtils.createArray(5, async () => {
        let chart = await client.charts.create((i++).toString())
        let event = await client.events.create(chart.key)
        generatedKeys.push(event.key)
    })
    await Promise.all(promises)

    let params = new ChartListParams().withExpandEvents(true)

    let page = await client.charts.listFirstPage(params)
    let eventKeys = page.items.map(chart => chart.events[0].key)

    expect(eventKeys.sort()).toEqual(generatedKeys.sort())
})
