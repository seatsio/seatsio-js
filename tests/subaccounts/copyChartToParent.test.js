const testUtils = require('../testUtils.js')

test('should copy chart to parent', async () => {
    let subaccount = await client.subaccounts.create()
    let chart = await testUtils.createClient(subaccount.secretKey).charts.create('aChart')

    let copiedChart = await client.subaccounts.copyChartToParent(subaccount.id, chart.key)

    let retrievedChart = await client.charts.retrieve(copiedChart.key)
    expect(copiedChart.name).toBe('aChart')
    expect(retrievedChart.name).toBe('aChart')
})
