const ChartListParams = require('../../src/Charts/ChartListParams.js')
const testUtils = require('../testUtils.js')

test('should list first page of charts', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    const chart3 = await client.charts.create()

    const page = await client.charts.listFirstPage()
    const chartKeys = page.items.map((chart) => chart.key)

    expect(chartKeys.sort()).toEqual([chart1.key, chart2.key, chart3.key].sort())
})

test('should list first page of charts with filter', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create('foo')
    const chart2 = await client.charts.create('foo')
    await client.charts.create('bar')
    const chart4 = await client.charts.create('foo')
    const params = new ChartListParams().withFilter('foo')

    const page = await client.charts.listFirstPage(params)
    const chartKeys = page.items.map((chart) => chart.key)

    expect(chartKeys.sort()).toEqual([chart1.key, chart2.key, chart4.key].sort())
})

test('should list first page of charts with tag', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    await client.charts.create('foo')
    await client.charts.create('foo')
    const chart3 = await client.charts.create('bar')
    await client.charts.addTag(chart3.key, 'foo')
    const params = new ChartListParams().withTag('foo')

    const page = await client.charts.listFirstPage(params)

    expect(page.items[0].key).toEqual(chart3.key)
})

test('pageSize of list first page of charts with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    await client.charts.create('foo')
    await client.charts.create('foo')
    const chart3 = await client.charts.create('bar')
    const chart4 = await client.charts.create('foo')

    const page = await client.charts.listFirstPage(null, 2)
    const chartKeys = page.items.map((chart) => chart.key)

    expect(chartKeys.sort()).toEqual([chart3.key, chart4.key].sort())
})

test('should list first page of charts with expanded events', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const generatedKeys = []
    for (let i = 0; i < 5; i++) {
        const chart = await client.charts.create(i.toString())
        const event = await client.events.create(chart.key)
        generatedKeys.push(event.key)
    }
    const params = new ChartListParams().withExpandEvents(true)

    const page = await client.charts.listFirstPage(params)
    const eventKeys = page.items.map(chart => chart.events[0].key)

    expect(eventKeys.sort()).toEqual(generatedKeys.sort())
})
