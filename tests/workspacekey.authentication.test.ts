import { TestUtils } from './testUtils'

test('workspace key can be passed in', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('some workspace')

    const workspaceClient = TestUtils.createClient(user.secretKey, workspace.key)
    const holdToken = await workspaceClient.holdTokens.create()

    expect(holdToken.workspaceKey).toBe(workspace.key)
})
