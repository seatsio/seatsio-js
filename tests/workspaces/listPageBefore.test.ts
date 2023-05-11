// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

test('should list workspaces before an id', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('foo1')
    const ws2 = await client.workspaces.create('foo2')
    const ws3 = await client.workspaces.create('foo3')

    const page = await client.workspaces.listPageBefore(ws1.id, null, 2)

        expect(page.items.map((workspace: any) => workspace.id)).toEqual([ws3.id, ws2.id])
})

test('should filter workspaces before an id', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const ws1 = await client.workspaces.create('foo1')
    await client.workspaces.create('bar')
    const ws3 = await client.workspaces.create('foo2')
    const ws4 = await client.workspaces.create('foo3')

    const page = await client.workspaces.listPageBefore(ws1.id, 'fo', 2)

        expect(page.items.map((workspace: any) => workspace.id)).toEqual([ws4.id, ws3.id])
})
