// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'
import { ChartListParams } from '../../src/Charts/ChartListParams.js'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list first page of charts', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const promises = [
        client.charts.create(),
        client.charts.create(),
        client.charts.create()
    ]
    const charts = await Promise.all(promises)

    const page = await client.charts.listFirstPage()
    const chartKeys = page.items.map((chart: any) => chart.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chartKeys.sort()).toEqual([charts[0].key, charts[1].key, charts[2].key].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list first page of charts with filter', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const promises = [
        client.charts.create('foo'),
        client.charts.create('foo'),
        client.charts.create('bar'),
        client.charts.create('foo')
    ]
    const charts = await Promise.all(promises)
    const params = new ChartListParams().withFilter('foo')

    const page = await client.charts.listFirstPage(params)
    const chartKeys = page.items.map((chart: any) => chart.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chartKeys.sort()).toEqual([charts[0].key, charts[1].key, charts[3].key].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list first page of charts with tag', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const promises = [
        client.charts.create('foo'),
        client.charts.create('foo'),
        client.charts.create('bar')
    ]
    const charts = await Promise.all(promises)
    await client.charts.addTag(charts[2].key, 'foo')
    const params = new ChartListParams().withTag('foo')

    const page = await client.charts.listFirstPage(params)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items[0].key).toEqual(charts[2].key)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('pageSize of list first page of charts with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.charts.create('foo')
    await client.charts.create('foo')
    const chart3 = await client.charts.create('bar')
    const chart4 = await client.charts.create('foo')

    const page = await client.charts.listFirstPage(null, 2)
    const chartKeys = page.items.map((chart: any) => chart.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chartKeys.sort()).toEqual([chart3.key, chart4.key].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list first page of charts with expanded events', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const generatedKeys = []
    for (let i = 0; i < 5; i++) {
        const chart = await client.charts.create(i.toString())
        const event = await client.events.create(chart.key)
        generatedKeys.push(event.key)
    }
    const params = new ChartListParams().withExpandEvents(true)

    const page = await client.charts.listFirstPage(params)
    const eventKeys = page.items.map((chart: any) => chart.events[0].key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(eventKeys.sort()).toEqual(generatedKeys.sort())
})
