// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

test('should retrieve a workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)

    expect(retrievedWorkspace.key).toBe(workspace.key)
    expect(retrievedWorkspace.secretKey).toBe(workspace.secretKey)
    expect(retrievedWorkspace.id).toBe(workspace.id)
    expect(retrievedWorkspace.settings).toEqual(workspace.settings)
    expect(retrievedWorkspace.name).toBe('a workspace')
    expect(retrievedWorkspace.isDefault).toBe(false)
    expect(retrievedWorkspace.isTest).toBe(false)
    expect(retrievedWorkspace.isActive).toBe(true)
})
