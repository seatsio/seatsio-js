const testUtils = require('../testUtils.js')

test('should list active workspaces', async () => {
    const { client, workspace } = await testUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('w1')
    const ws2 = await client.workspaces.create('w2')
    await client.workspaces.deactivate(ws2.key)
    const ws3 = await client.workspaces.create('w3')

    const workspaces = []
    for await (const workspace of client.workspaces.listActive()) {
        workspaces.push(workspace)
    }

    expect(workspaces.map(workspace => workspace.id)).toEqual([ws3.id, ws1.id, workspace.id])
})

test('should filter active workspaces', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('foo1')
    await client.workspaces.create('bar')
    const ws3 = await client.workspaces.create('foo2')
    const ws4 = await client.workspaces.create('foo3')
    await client.workspaces.deactivate(ws4.key)

    const workspaces = []
    for await (const workspace of client.workspaces.listActive('fo')) {
        workspaces.push(workspace)
    }

    expect(workspaces.map(workspace => workspace.id)).toEqual([ws3.id, ws1.id])
})
