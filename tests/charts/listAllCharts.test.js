const ChartListParams = require('../../src/Charts/ChartListParams.js')
const testUtils = require('../testUtils.js')

test('listAll when there are many charts', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const charts = await testUtils.createArray(15, () => client.charts.create())

    const retrievedKeys = []
    for await (const chart of client.charts.listAll()) {
        retrievedKeys.push(chart.key)
    }

    expect(retrievedKeys.sort()).toEqual(charts.map(c => c.key).sort())
})

test('listAll when there are no charts', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const retrievedKeys = []

    for await (const chart of client.charts.listAll()) {
        retrievedKeys.push(chart.key)
    }

    expect(retrievedKeys).toEqual([])
})

test('listAll Charts with filter', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const fooCharts = await testUtils.createArray(3, () => client.charts.create('foo'))
    await client.charts.create('bar')
    const params = new ChartListParams().withFilter('foo')

    const retrievedKeys = []
    for await (const chart of client.charts.listAll(params)) {
        retrievedKeys.push(chart.key)
    }

    expect(retrievedKeys.sort()).toEqual(fooCharts.map(c => c.key).sort())
})

test('listAll Charts with tag', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const fooCharts = await testUtils.createArray(3, async () => {
        const chart = await client.charts.create()
        await client.charts.addTag(chart.key, 'foo')
        return chart
    })

    await client.charts.create('bar')
    const params = new ChartListParams().withTag('foo')

    const retrievedChartKeys = []
    for await (const chart of client.charts.listAll(params)) {
        retrievedChartKeys.push(chart.key)
    }

    expect(retrievedChartKeys.sort()).toEqual(fooCharts.map(c => c.key).sort())
})

test('listAll Charts with tag and filter parameters', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create('bar')
    const chart2 = await client.charts.create()
    const chart3 = await client.charts.create('bar')
    await client.charts.create('bar')
    await client.charts.addTag(chart1.key, 'foo')
    await client.charts.addTag(chart2.key, 'foo')
    await client.charts.addTag(chart3.key, 'foo')
    const retrievedKeys = []
    const params = new ChartListParams().withFilter('bar').withTag('foo')

    for await (const chart of client.charts.listAll(params)) {
        retrievedKeys.push(chart.key)
    }

    expect(retrievedKeys.sort()).toEqual([chart1.key, chart3.key].sort())
})

test('listAll Charts with expandEvents parameters', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    const promises = [
        client.events.create(chart1.key),
        client.events.create(chart1.key),
        client.events.create(chart2.key),
        client.events.create(chart2.key)
    ]
    const events = await Promise.all(promises)
    const generatedEventKeys = [events[0].key, events[1].key, events[2].key, events[3].key]
    const retrievedKeys = []
    const params = new ChartListParams().withExpandEvents(true)

    for await (const chart of client.charts.listAll(params)) {
        for (const event of chart.events) {
            retrievedKeys.push(event.key)
        }
    }

    expect(retrievedKeys.sort()).toEqual(generatedEventKeys.sort())
})

test('listAll Charts with expandEvents parameters and eventsLimit', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const event1 = await client.events.create(chart1.key)
    const event2 = await client.events.create(chart1.key)
    const event3 = await client.events.create(chart1.key)
    const retrievedKeys = []
    const params = new ChartListParams().withExpandEvents(true).withEventsLimit(2)

    for await (const chart of client.charts.listAll(params)) {
        for (const event of chart.events) {
            retrievedKeys.push(event.key)
        }
    }

    expect(retrievedKeys).toEqual([event3.key, event2.key])
})

test('list all charts with validation', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    await testUtils.createArray(3, () => client.charts.create())
    const params = new ChartListParams(...Array(3), true)

    for await (const chart of client.charts.listAll(params)) {
        expect(chart).toHaveProperty('validation')
    }
})

test('list all charts without validation', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    await testUtils.createArray(3, () => client.charts.create())
    const params = new ChartListParams()

    for await (const chart of client.charts.listAll(params)) {
        expect(chart).not.toHaveProperty('validation')
    }
})
