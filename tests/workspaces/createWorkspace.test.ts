import { TestUtils } from '../testUtils.js'
import { ForSaleModes } from '../../src/Workspaces/ForSaleMode.js'

test('should create a workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    expect(workspace.key).toBeTruthy()
    expect(workspace.secretKey).toBeTruthy()
    expect(workspace.id).toBeTruthy()
    expect(workspace.settings).toBeTruthy()
    expect(workspace.name).toBe('a workspace')
    expect(workspace.isTest).toBe(false)
    expect(workspace.isActive).toBe(true)
})

test('should create a test workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace', true)

    expect(workspace.key).toBeTruthy()
    expect(workspace.secretKey).toBeTruthy()
    expect(workspace.id).toBeTruthy()
    expect(workspace.isTest).toBe(true)
    expect(workspace.isActive).toBe(true)
})

test('should create a workspace with a for sale mode', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace', false, ForSaleModes.UNLIMITED_BILLABLE)

    expect(workspace.key).toBeTruthy()
    expect(workspace.name).toBe('a workspace')
    expect(workspace.isActive).toBe(true)
})
