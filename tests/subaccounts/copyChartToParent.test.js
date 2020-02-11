const testUtils = require('../testUtils.js')

test('should copy chart to parent', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()
    const chart = await testUtils.createClient(subaccount.secretKey).charts.create('aChart')

    const copiedChart = await client.subaccounts.copyChartToParent(subaccount.id, chart.key)

    const retrievedChart = await client.charts.retrieve(copiedChart.key)
    expect(copiedChart.name).toBe('aChart')
    expect(retrievedChart.name).toBe('aChart')
})
