const testUtils = require('../testUtils.js')

test('should create a workspace', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    expect(workspace.key).toBeTruthy()
    expect(workspace.secretKey).toBeTruthy()
    expect(workspace.id).toBeTruthy()
    expect(workspace.settings).toBeTruthy()
    expect(workspace.name).toBe('a workspace')
    expect(workspace.isTest).toBe(false)
    expect(workspace.isActive).toBe(true)
})

test('should create a test workspace', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace', true)

    expect(workspace.key).toBeTruthy()
    expect(workspace.secretKey).toBeTruthy()
    expect(workspace.id).toBeTruthy()
    expect(workspace.isTest).toBe(true)
    expect(workspace.isActive).toBe(true)
})
