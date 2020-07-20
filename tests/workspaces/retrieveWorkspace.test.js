const testUtils = require('../testUtils.js')

test('should retrieve a workspace', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)

    expect(retrievedWorkspace.key).toBe(workspace.key)
    expect(retrievedWorkspace.secretKey).toBe(workspace.secretKey)
    expect(retrievedWorkspace.id).toBe(workspace.id)
    expect(retrievedWorkspace.settings).toEqual(workspace.settings)
    expect(retrievedWorkspace.name).toBe('a workspace')
    expect(retrievedWorkspace.isDefault).toBe(false)
    expect(retrievedWorkspace.isTest).toBe(false)
    expect(retrievedWorkspace.isActive).toBe(true)
})
