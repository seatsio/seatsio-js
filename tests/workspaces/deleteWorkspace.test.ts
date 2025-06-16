import { TestUtils } from '../testUtils'

test('should delete an inactive workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')
    await client.workspaces.deactivate(workspace.key)

    await client.workspaces.delete(workspace.key)

    const retrieveFail = await client.workspaces.retrieve(workspace.key).catch((err: any) => err)
    expect(retrieveFail.status).toBe(404)
})

test('should not delete an active workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    const deleteFail = await client.workspaces.delete(workspace.key).catch((err: any) => err)
    expect(deleteFail.status).toBe(400)
    expect(deleteFail.messages[0]).toBe('Cannot delete active workspace, please deactivate it first')
})
