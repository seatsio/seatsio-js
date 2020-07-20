const testUtils = require('../testUtils.js')

test('should set the default workspace', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    await client.workspaces.setDefault(workspace.key)

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)
    expect(retrievedWorkspace.isDefault).toBe(true)
})
