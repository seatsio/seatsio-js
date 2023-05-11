import { ChartListParams } from '../../src/Charts/ChartListParams.js'
// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list charts before a given chart id', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    const chart3 = await client.charts.create()

    const page = await client.charts.listPageBefore(chart1.id)
    const chartKeys = page.items.map((chart: any) => chart.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chartKeys.sort()).toEqual([chart2.key, chart3.key].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list charts before a given chart id with filter', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart1 = await client.charts.create('foo')
    const chart2 = await client.charts.create('foo')
    await client.charts.create('bar')
    const chart4 = await client.charts.create('foo')

    const params = new ChartListParams().withFilter('foo')
    const page = await client.charts.listPageBefore(chart1.id, params)
    const chartKeys = page.items.map((chart: any) => chart.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chartKeys.sort()).toEqual([chart2.key, chart4.key].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list charts before a given chart id with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart1 = await client.charts.create('foo')
    const chart2 = await client.charts.create('foo')
    const chart3 = await client.charts.create('bar')
    await client.charts.create('foo')

    const page = await client.charts.listPageBefore(chart1.id, null, 2)
    const chartKeys = page.items.map((chart: any) => chart.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chartKeys.sort()).toEqual([chart2.key, chart3.key].sort())
})
