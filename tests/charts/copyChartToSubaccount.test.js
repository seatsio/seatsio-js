import { TestUtils } from '../testUtils'

test('should copy to subaccount', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()
    const subaccountClient = TestUtils.createClient(subaccount.secretKey)
    const chart = await client.charts.create('My chart')

    const copiedChart = await client.charts.copyToSubaccount(chart.key, subaccount.id)

    const retrievedChart = await subaccountClient.charts.retrieve(copiedChart.key)
    expect(copiedChart.name).toEqual('My chart')
    expect(copiedChart.key).not.toBe(chart.key)
    expect(retrievedChart.name).toEqual('My chart')
})
