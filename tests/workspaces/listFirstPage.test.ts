// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list workspaces in first page', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.workspaces.create('w1')
    const ws2 = await client.workspaces.create('w2')
    const ws3 = await client.workspaces.create('w3')

    const page = await client.workspaces.listFirstPage(null, 2)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items.map((workspace: any) => workspace.id)).toEqual([ws3.id, ws2.id])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should filter workspaces in first page', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('foo1')
    await client.workspaces.create('bar')
    const ws3 = await client.workspaces.create('foo2')

    const page = await client.workspaces.listFirstPage('fo', 2)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items.map((workspace: any) => workspace.id)).toEqual([ws3.id, ws1.id])
})
