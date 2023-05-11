// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should copy to workspace', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')
    const workspaceClient = TestUtils.createClient(user.secretKey, workspace.key)
    const chart = await client.charts.create('My chart')

    const copiedChart = await client.charts.copyToWorkspace(chart.key, workspace.key)
    const retrievedChart = await workspaceClient.charts.retrieve(copiedChart.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(copiedChart.name).toEqual('My chart')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(copiedChart.key).not.toBe(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.name).toEqual('My chart')
})
