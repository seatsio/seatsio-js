test('should list all workspaces', async () => {
    const ws1 = await client.workspaces.create('')
    const ws2 = await client.workspaces.create('')
    const ws3 = await client.workspaces.create('')

    const workspaces = []
    for await (const workspace of client.workspaces.listAll()) {
        workspaces.push(workspace)
    }

    expect(workspaces.map(workspace => workspace.id)).toEqual([ws3.id, ws2.id, ws1.id, user.primaryWorkspace.id])
})

test('should filter all workspaces', async () => {
    const ws1 = await client.workspaces.create('foo')
    await client.workspaces.create('bar')
    const ws3 = await client.workspaces.create('foo')

    const workspaces = []
    for await (const workspace of client.workspaces.listAll('fo')) {
        workspaces.push(workspace)
    }

    expect(workspaces.map(workspace => workspace.id)).toEqual([ws3.id, ws1.id])
})
