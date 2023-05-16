import { TestUtils } from '../testUtils'

test('should copy chart to subaccount', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const fromSubaccount = await client.subaccounts.create()
    const toSubaccount = await client.subaccounts.create()
    const chart = await TestUtils.createClient(fromSubaccount.secretKey).charts.create('aChart')

    const copiedChart = await client.subaccounts.copyChartToSubaccount(fromSubaccount.id, toSubaccount.id, chart.key)

    const retrievedChart = await TestUtils.createClient(toSubaccount.secretKey).charts.retrieve(copiedChart.key)
    expect(copiedChart.name).toBe('aChart')
    expect(retrievedChart.name).toBe('aChart')
})
