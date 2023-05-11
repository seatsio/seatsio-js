import { ChartListParams } from '../../src/Charts/ChartListParams.js'
// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('listAll when there are many charts', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const charts = await TestUtils.createArray(15, () => client.charts.create())

    const retrievedKeys = []
    for await (const chart of client.charts.listAll()) {
        retrievedKeys.push(chart.key)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedKeys.sort()).toEqual(charts.map(c => c.key).sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('listAll when there are no charts', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const retrievedKeys = []

    for await (const chart of client.charts.listAll()) {
        retrievedKeys.push(chart.key)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedKeys).toEqual([])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('listAll Charts with filter', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const fooCharts = await TestUtils.createArray(3, () => client.charts.create('foo'))
    await client.charts.create('bar')
    const params = new ChartListParams().withFilter('foo')

    const retrievedKeys = []
    for await (const chart of client.charts.listAll(params)) {
        retrievedKeys.push(chart.key)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedKeys.sort()).toEqual(fooCharts.map(c => c.key).sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('listAll Charts with tag', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const fooCharts = await TestUtils.createArray(3, async () => {
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

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChartKeys.sort()).toEqual(fooCharts.map(c => c.key).sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('listAll Charts with tag and filter parameters', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
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

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedKeys.sort()).toEqual([chart1.key, chart3.key].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('listAll Charts with expandEvents parameters', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
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

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedKeys.sort()).toEqual(generatedEventKeys.sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('listAll Charts with expandEvents parameters and eventsLimit', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    await client.events.create(chart1.key)
    const event2 = await client.events.create(chart1.key)
    const event3 = await client.events.create(chart1.key)
    const retrievedKeys = []
    const params = new ChartListParams().withExpandEvents(true).withEventsLimit(2)

    for await (const chart of client.charts.listAll(params)) {
        for (const event of chart.events) {
            retrievedKeys.push(event.key)
        }
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedKeys).toEqual([event3.key, event2.key])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('list all charts with validation', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await TestUtils.createArray(3, () => client.charts.create())
    // @ts-expect-error TS(2345): Argument of type 'true' is not assignable to param... Remove this comment to see the full error message
    const params = new ChartListParams(...Array(3), true)

    for await (const chart of client.charts.listAll(params)) {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(chart).toHaveProperty('validation')
    }
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('list all charts without validation', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await TestUtils.createArray(3, () => client.charts.create())
    const params = new ChartListParams()

    for await (const chart of client.charts.listAll(params)) {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(chart).not.toHaveProperty('validation')
    }
})
