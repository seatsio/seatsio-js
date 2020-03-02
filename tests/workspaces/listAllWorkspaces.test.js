const testUtils = require('../testUtils.js')

test('should list all workspaces', async () => {
    const { client, workspace } = await testUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('w1')
    const ws2 = await client.workspaces.create('w2')
    const ws3 = await client.workspaces.create('w3')

    const workspaces = []
    for await (const workspace of client.workspaces.listAll()) {
        workspaces.push(workspace)
    }

    expect(workspaces.map(workspace => workspace.id)).toEqual([ws3.id, ws2.id, ws1.id, workspace.id])
})

test('should filter all workspaces', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('foo1')
    await client.workspaces.create('bar')
    const ws3 = await client.workspaces.create('foo2')

    const workspaces = []
    for await (const workspace of client.workspaces.listAll('fo')) {
        workspaces.push(workspace)
    }

    expect(workspaces.map(workspace => workspace.id)).toEqual([ws3.id, ws1.id])
})
