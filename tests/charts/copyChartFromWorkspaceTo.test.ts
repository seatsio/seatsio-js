import { TestUtils } from '../testUtils'

test('should copy from workspace to', async () => {
    const { client, user, workspace } = await TestUtils.createTestUserAndClient()
    const toWorkspace = await client.workspaces.create('a workspace')
    const workspaceClient = TestUtils.createClient(user.secretKey, toWorkspace.key)
    const chart = await client.charts.create('My chart')

    const copiedChart = await client.charts.copyFromWorkspaceTo(chart.key, workspace.key, toWorkspace.key)
    const retrievedChart = await workspaceClient.charts.retrieve(copiedChart.key)

    expect(copiedChart.name).toEqual('My chart')
    expect(copiedChart.key).not.toBe(chart.key)
    expect(retrievedChart.name).toEqual('My chart')
})
