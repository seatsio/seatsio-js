const testUtils = require('../testUtils.js')

test('should activate a workspace', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')
    await client.workspaces.deactivate(workspace.key)

    await client.workspaces.activate(workspace.key)

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)
    expect(retrievedWorkspace.isActive).toBe(true)
})
