const ChartListParams = require('../../src/Charts/ChartListParams.js')
const testUtils = require('../testUtils.js')

test('listAll when there are more than 40 charts', async () => {
    let chartPromises = testUtils.createArray(41, () => client.charts.create())
    let charts = await Promise.all(chartPromises)

    let retrievedKeys = []
    for await (const chart of client.charts.listAll()) {
        retrievedKeys.push(chart.key)
    }

    expect(retrievedKeys.sort()).toEqual(charts.map(c => c.key).sort())
})

test('listAll when there are no charts', async () => {
    let retrievedKeys = []

    for await (const chart of client.charts.listAll()) {
        retrievedKeys.push(chart.key)
    }

    expect(retrievedKeys).toEqual([])
})

test('listAll Charts with filter', async () => {
    let fooChartPromises = testUtils.createArray(5, () => client.charts.create('foo'))
    let fooCharts = await Promise.all(fooChartPromises)
    await client.charts.create('bar')
    let params = new ChartListParams().withFilter('foo')

    let retrievedKeys = []
    for await (const chart of client.charts.listAll(params)) {
        retrievedKeys.push(chart.key)
    }

    expect(retrievedKeys.sort()).toEqual(fooCharts.map(c => c.key).sort())
})

test('listAll Charts with tag', async () => {
    let fooChartPromises = testUtils.createArray(5, async () => {
        let chart = await client.charts.create()
        await client.charts.addTag(chart.key, 'foo')
        return chart
    })
    let fooCharts = await Promise.all(fooChartPromises)

    await client.charts.create('bar')
    let params = new ChartListParams().withTag('foo')

    let retrievedChartKeys = []
    for await (const chart of client.charts.listAll(params)) {
        retrievedChartKeys.push(chart.key)
    }

    expect(retrievedChartKeys.sort()).toEqual(fooCharts.map(c => c.key).sort())
})

test('listAll Charts with tag and filter parameters', async () => {
    let chart1 = await client.charts.create('bar')
    let chart2 = await client.charts.create()
    let chart3 = await client.charts.create('bar')
    let promises = [
        client.charts.create('bar'),
        client.charts.addTag(chart1.key, 'foo'),
        client.charts.addTag(chart2.key, 'foo'),
        client.charts.addTag(chart3.key, 'foo')
    ]
    await Promise.all(promises)
    let retrievedKeys = []
    let params = new ChartListParams().withFilter('bar').withTag('foo')

    for await (const chart of client.charts.listAll(params)) {
        retrievedKeys.push(chart.key)
    }

    expect(retrievedKeys.sort()).toEqual([chart1.key, chart3.key].sort())
})

test('listAll Charts with expandEvents parameters', async () => {
    let chart1 = await client.charts.create()
    let chart2 = await client.charts.create()
    let promises = [
        client.events.create(chart1.key),
        client.events.create(chart1.key),
        client.events.create(chart2.key),
        client.events.create(chart2.key)
    ]
    let events = await Promise.all(promises)
    let generatedEventKeys = [events[0].key, events[1].key, events[2].key, events[3].key]
    let retrievedKeys = []
    let params = new ChartListParams().withExpandEvents(true)

    for await (const chart of client.charts.listAll(params)) {
        for (let event of chart.events) {
            retrievedKeys.push(event.key)
        }
    }

    expect(retrievedKeys.sort()).toEqual(generatedEventKeys.sort())
})

test('list all charts with validation', async () => {
    testUtils.createArray(5, () => client.charts.create())
    let params = new ChartListParams(...Array(3), true)

    for await (const chart of client.charts.listAll(params)) {
        expect(chart).toHaveProperty('validation')
    }
})

test('list all charts without validation', async () => {
    testUtils.createArray(5, () => client.charts.create())
    let params = new ChartListParams()

    for await (const chart of client.charts.listAll(params)) {
        expect(chart).not.toHaveProperty('validation')
    }
})
