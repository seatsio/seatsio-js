// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should copy chart to subaccount', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const fromSubaccount = await client.subaccounts.create()
    const toSubaccount = await client.subaccounts.create()
    const chart = await TestUtils.createClient(fromSubaccount.secretKey)
        .charts.create('aChart')

    const copiedChart = await client.subaccounts.copyChartToSubaccount(fromSubaccount.id, toSubaccount.id, chart.key)

    const retrievedChart = await TestUtils.createClient(toSubaccount.secretKey)
        .charts.retrieve(copiedChart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(copiedChart.name).toBe('aChart')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.name).toBe('aChart')
})
