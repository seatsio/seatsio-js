import { TestUtils } from '../testUtils.js'
import { ForSaleModes } from '../../src/Workspaces/ForSaleMode.js'

test('should retrieve a workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    await client.workspaces.update(workspace.key, 'another workspace')

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)
    expect(retrievedWorkspace.name).toBe('another workspace')
})

test('should update the for sale mode of a workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    await client.workspaces.update(workspace.key, 'another workspace', ForSaleModes.UNLIMITED_BILLABLE)

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)
    expect(retrievedWorkspace.name).toBe('another workspace')
})
