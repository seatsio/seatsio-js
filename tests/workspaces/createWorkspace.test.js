test('should create a workspace', async () => {
    const workspace = await client.workspaces.create('a workspace')

    expect(workspace.key).toBeTruthy()
    expect(workspace.id).toBeTruthy()
    expect(workspace.primaryUser).toBeTruthy()
    expect(workspace.settings).toBeTruthy()
    expect(workspace.name).toBe('a workspace')
})
