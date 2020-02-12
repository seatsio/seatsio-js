const testUtils = require('../testUtils.js')

test('should copy chart to subaccount', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const fromSubaccount = await client.subaccounts.create()
    const toSubaccount = await client.subaccounts.create()
    const chart = await testUtils.createClient(fromSubaccount.secretKey)
        .charts.create('aChart')

    const copiedChart = await client.subaccounts.copyChartToSubaccount(fromSubaccount.id, toSubaccount.id, chart.key)

    const retrievedChart = await testUtils.createClient(toSubaccount.secretKey)
        .charts.retrieve(copiedChart.key)
    expect(copiedChart.name).toBe('aChart')
    expect(retrievedChart.name).toBe('aChart')
})
