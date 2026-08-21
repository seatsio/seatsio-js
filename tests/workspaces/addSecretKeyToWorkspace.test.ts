import { TestUtils } from '../testUtils.js'

test('should add a secret key to a workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')
    const originalSecretKey = workspace.secretKey

    const newSecretKey = await client.workspaces.addSecretKey(workspace.key)

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)
    expect(retrievedWorkspace.secretKeys).toContain(originalSecretKey)
    expect(retrievedWorkspace.secretKeys).toContain(newSecretKey)
})
