const testUtils = require('../testUtils.js')

test('should copy to subaccount', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()
    const subaccountClient = testUtils.createClient(subaccount.secretKey)
    const chart = await client.charts.create('My chart')

    const copiedChart = await client.charts.copyToSubaccount(chart.key, subaccount.id)

    const retrievedChart = await subaccountClient.charts.retrieve(copiedChart.key)
    expect(copiedChart.name).toEqual('My chart')
    expect(copiedChart.key).not.toBe(chart.key)
    expect(retrievedChart.name).toEqual('My chart')
})
