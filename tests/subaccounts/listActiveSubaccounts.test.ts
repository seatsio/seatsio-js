// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list all active subaccounts', async () => {
    const { client, subaccount } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()
    await client.subaccounts.deactivate(subaccount3.id)
    const activeSubaccountIds = []

    for await (const subaccount of client.subaccounts.active.all()) {
        activeSubaccountIds.push(subaccount.id)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(activeSubaccountIds.sort()).toEqual([subaccount2.id, subaccount1.id, subaccount.id].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list first page of active subaccounts', async () => {
    const { client, subaccount } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()

    const firstPage = await client.subaccounts.active.firstPage()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(firstPage.items.map((item: any) => item.id).sort()).toEqual([subaccount1.id, subaccount2.id, subaccount3.id, subaccount.id].sort())
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(firstPage.items.length).toBe(4)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list first page of active subaccounts with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.subaccounts.create()
    await client.subaccounts.create()
    const subaccount = await client.subaccounts.create()

    const firstPage = await client.subaccounts.active.firstPage(null, 1)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(firstPage.items[0].id).toEqual(subaccount.id)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(firstPage.items.length).toBe(1)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list page after of active subaccounts', async () => {
    const { client, subaccount } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()

    const pageAfter = await client.subaccounts.active.pageAfter(subaccount3.id)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect([pageAfter.items[0].id, pageAfter.items[1].id, pageAfter.items[2].id].sort()).toEqual([subaccount1.id, subaccount2.id, subaccount.id].sort())
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(pageAfter.items.length).toBe(3)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list page after of active subaccounts with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()

    const pageAfter = await client.subaccounts.active.pageAfter(subaccount3.id, null, 1)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(pageAfter.items[0].id).toEqual(subaccount2.id)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(pageAfter.items.length).toBe(1)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list page before of active subaccounts', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()

    const pageAfter = await client.subaccounts.active.pageBefore(subaccount1.id)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect([pageAfter.items[0].id, pageAfter.items[1].id].sort()).toEqual([subaccount2.id, subaccount3.id].sort())
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(pageAfter.items.length).toBe(2)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list page before of active subaccounts with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    await client.subaccounts.create()

    const pageAfter = await client.subaccounts.active.pageBefore(subaccount1.id, null, 1)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(pageAfter.items[0].id).toEqual(subaccount2.id)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(pageAfter.items.length).toBe(1)
})
