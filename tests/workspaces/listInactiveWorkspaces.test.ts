// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list inactive workspaces', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('w1')
    await client.workspaces.deactivate(ws1.key)
    await client.workspaces.create('w2')
    const ws3 = await client.workspaces.create('w3')
    await client.workspaces.deactivate(ws3.key)

    const workspaces = []
    for await (const workspace of client.workspaces.listInactive()) {
        workspaces.push(workspace)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspaces.map(workspace => workspace.id)).toEqual([ws3.id, ws1.id])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should filter inactive workspaces', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('foo1')
    await client.workspaces.create('bar')
    await client.workspaces.deactivate(ws1.key)
    const ws3 = await client.workspaces.create('foo2')
    await client.workspaces.deactivate(ws3.key)
    await client.workspaces.create('foo3')

    const workspaces = []
    for await (const workspace of client.workspaces.listInactive('fo')) {
        workspaces.push(workspace)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(workspaces.map(workspace => workspace.id)).toEqual([ws3.id, ws1.id])
})
