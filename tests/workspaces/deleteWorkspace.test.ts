import { TestUtils } from '../testUtils'

test('should delete an inactive workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')
    await client.workspaces.deactivate(workspace.key)

    await client.workspaces.delete(workspace.key)

    const retrieveFail = await client.workspaces.retrieve(workspace.key).catch((err: any) => err)
    expect(retrieveFail.status).toBe(404)
})
