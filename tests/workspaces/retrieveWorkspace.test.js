test('should retrieve a workspace', async () => {
    const workspace = await client.workspaces.create('a workspace')

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)

    expect(retrievedWorkspace.key).toBe(workspace.key)
    expect(retrievedWorkspace.id).toBe(workspace.id)
    expect(retrievedWorkspace.primaryUser).toEqual(workspace.primaryUser)
    expect(retrievedWorkspace.settings).toEqual(workspace.settings)
    expect(retrievedWorkspace.name).toBe('a workspace')
})
