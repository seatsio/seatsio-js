// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should retrieve a workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    const newSecretKey = await client.workspaces.regenerateSecretKey(workspace.key)

    const retrievedWorkspace = await client.workspaces.retrieve(workspace.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(newSecretKey).not.toBe(workspace.secretKey)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedWorkspace.secretKey).toBe(newSecretKey)
})
