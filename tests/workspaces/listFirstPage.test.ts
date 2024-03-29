import { TestUtils } from '../testUtils'
import { Workspace } from '../../src/Workspaces/Workspace'

test('should list workspaces in first page', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.workspaces.create('w1')
    const ws2 = await client.workspaces.create('w2')
    const ws3 = await client.workspaces.create('w3')

    const page = await client.workspaces.listFirstPage(null, 2)

    expect(page.items.map((workspace: Workspace) => workspace.id)).toEqual([ws3.id, ws2.id])
})

test('should filter workspaces in first page', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('foo1')
    await client.workspaces.create('bar')
    const ws3 = await client.workspaces.create('foo2')

    const page = await client.workspaces.listFirstPage('fo', 2)

    expect(page.items.map((workspace: Workspace) => workspace.id)).toEqual([ws3.id, ws1.id])
})
