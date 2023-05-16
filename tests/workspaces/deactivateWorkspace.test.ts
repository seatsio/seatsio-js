import { TestUtils } from '../testUtils'

test('should deactivate a workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    await client.workspaces.deactivate(workspace.key)

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)
    expect(retrievedWorkspace.isActive).toBe(false)
})
