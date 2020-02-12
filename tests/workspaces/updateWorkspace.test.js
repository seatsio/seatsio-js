const testUtils = require('../testUtils.js')

test('should retrieve a workspace', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    await client.workspaces.update(workspace.key, 'another workspace')

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)
    expect(retrievedWorkspace.name).toBe('another workspace')
})
