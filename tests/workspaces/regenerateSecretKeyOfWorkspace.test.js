const testUtils = require('../testUtils.js')

test('should retrieve a workspace', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    const newSecretKey = await client.workspaces.regenerateSecretKey(workspace.key)

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)
    expect(newSecretKey).not.toBe(workspace.secretKey)
    expect(retrievedWorkspace.secretKey).toBe(newSecretKey)
})
