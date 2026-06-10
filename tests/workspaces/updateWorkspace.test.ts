import { TestUtils } from '../testUtils.js'

test('should retrieve a workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    await client.workspaces.update(workspace.key, 'another workspace')

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)
    expect(retrievedWorkspace.name).toBe('another workspace')
})
