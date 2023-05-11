// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should create a workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspace.key).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspace.secretKey).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspace.id).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspace.settings).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspace.name).toBe('a workspace')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspace.isTest).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspace.isActive).toBe(true)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should create a test workspace', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const workspace = await client.workspaces.create('a workspace', true)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspace.key).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspace.secretKey).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspace.id).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspace.isTest).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspace.isActive).toBe(true)
})
