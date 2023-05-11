// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

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
