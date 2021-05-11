const testUtils = require('../testUtils.js')

test('should list inactive workspaces', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('w1')
    await client.workspaces.deactivate(ws1.key)
    const ws2 = await client.workspaces.create('w2')
    const ws3 = await client.workspaces.create('w3')
    await client.workspaces.deactivate(ws3.key)

    const workspaces = []
    for await (const workspace of client.workspaces.listInactive()) {
        workspaces.push(workspace)
    }

    expect(workspaces.map(workspace => workspace.id)).toEqual([ws3.id, ws1.id])
})

test('should filter inactive workspaces', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('foo1')
    await client.workspaces.create('bar')
    await client.workspaces.deactivate(ws1.key)
    const ws3 = await client.workspaces.create('foo2')
    await client.workspaces.deactivate(ws3.key)
    const ws4 = await client.workspaces.create('foo3')

    const workspaces = []
    for await (const workspace of client.workspaces.listInactive('fo')) {
        workspaces.push(workspace)
    }

    expect(workspaces.map(workspace => workspace.id)).toEqual([ws3.id, ws1.id])
})
