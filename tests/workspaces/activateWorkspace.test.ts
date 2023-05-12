import { TestUtils } from '../testUtils'

test('should activate a workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')
    await client.workspaces.deactivate(workspace.key)

    await client.workspaces.activate(workspace.key)

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)
    expect(retrievedWorkspace.isActive).toBe(true)
})
