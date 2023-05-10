import { TestUtils } from '../testUtils'

test('should copy chart to parent', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()
    const chart = await TestUtils.createClient(subaccount.secretKey).charts.create('aChart')

    const copiedChart = await client.subaccounts.copyChartToParent(subaccount.id, chart.key)

    const retrievedChart = await client.charts.retrieve(copiedChart.key)
    expect(copiedChart.name).toBe('aChart')
    expect(retrievedChart.name).toBe('aChart')
})
