import { TestUtils } from '../testUtils.js'

test('should remove a secret key from a workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')
    const originalSecretKey = workspace.secretKey

    const newSecretKey = await client.workspaces.addSecretKey(workspace.key)
    await client.workspaces.removeSecretKey(workspace.key, originalSecretKey)

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)
    expect(retrievedWorkspace.secretKeys).not.toContain(originalSecretKey)
    expect(retrievedWorkspace.secretKeys).toContain(newSecretKey)
})
