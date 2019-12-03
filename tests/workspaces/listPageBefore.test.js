test('should list workspaces before an id', async () => {
    const ws1 = await client.workspaces.create('')
    const ws2 = await client.workspaces.create('')
    const ws3 = await client.workspaces.create('')

    const page = await client.workspaces.listPageBefore(ws1.id, null, 2)

    expect(page.items.map(workspace => workspace.id)).toEqual([ws3.id, ws2.id])
})

test('should filter workspaces before an id', async () => {
    const ws1 = await client.workspaces.create('foo')
    await client.workspaces.create('bar')
    const ws3 = await client.workspaces.create('foo')
    const ws4 = await client.workspaces.create('foo')

    const page = await client.workspaces.listPageBefore(ws1.id, 'fo', 2)

    expect(page.items.map(workspace => workspace.id)).toEqual([ws4.id, ws3.id])
})
