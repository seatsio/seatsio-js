import { TestUtils } from '../testUtils'
import { ChartListParams } from '../../src/Charts/ChartListParams'
import { Chart } from '../../src/Charts/Chart'

test('should list charts before a given chart id', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    const chart3 = await client.charts.create()

    const page = await client.charts.listPageBefore(chart1.id)
    const chartKeys = page.items.map((chart: Chart) => chart.key)

    expect(chartKeys.sort()).toEqual([chart2.key, chart3.key].sort())
})

test('should list charts before a given chart id with filter', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart1 = await client.charts.create('foo')
    const chart2 = await client.charts.create('foo')
    await client.charts.create('bar')
    const chart4 = await client.charts.create('foo')

    const params = new ChartListParams().withFilter('foo')
    const page = await client.charts.listPageBefore(chart1.id, params)
    const chartKeys = page.items.map((chart: Chart) => chart.key)

    expect(chartKeys.sort()).toEqual([chart2.key, chart4.key].sort())
})

test('should list charts before a given chart id with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart1 = await client.charts.create('foo')
    const chart2 = await client.charts.create('foo')
    const chart3 = await client.charts.create('bar')
    await client.charts.create('foo')

    const page = await client.charts.listPageBefore(chart1.id, null, 2)
    const chartKeys = page.items.map((chart: Chart) => chart.key)

    expect(chartKeys.sort()).toEqual([chart2.key, chart3.key].sort())
})
