import { TestUtils } from '../testUtils'

test('should copy to workspace', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')
    const workspaceClient = TestUtils.createClient(user.secretKey, workspace.key)
    const chart = await client.charts.create('My chart')

    const copiedChart = await client.charts.copyToWorkspace(chart.key, workspace.key)
    const retrievedChart = await workspaceClient.charts.retrieve(copiedChart.key)

    expect(copiedChart.name).toEqual('My chart')
    expect(copiedChart.key).not.toBe(chart.key)
    expect(retrievedChart.name).toEqual('My chart')
})
