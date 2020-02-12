const testUtils = require('../testUtils.js')

test('should list workspaces after an id', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('w1')
    const ws2 = await client.workspaces.create('w2')
    const ws3 = await client.workspaces.create('w3')

    const page = await client.workspaces.listPageAfter(ws3.id, null, 2)

    expect(page.items.map(workspace => workspace.id)).toEqual([ws2.id, ws1.id])
})

test('should filter workspaces after an id', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('workspace1')
    await client.workspaces.create('bar')
    const ws3 = await client.workspaces.create('workspace2')
    const ws4 = await client.workspaces.create('workspace3')

    const page = await client.workspaces.listPageAfter(ws4.id, 'wo', 2)

    expect(page.items.map(workspace => workspace.id)).toEqual([ws3.id, ws1.id])
})
