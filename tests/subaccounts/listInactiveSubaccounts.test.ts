// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list all inactive subaccounts', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.create(),
        client.subaccounts.deactivate(subaccount1.id),
        client.subaccounts.deactivate(subaccount2.id)
    ]
    await Promise.all(promises)
    const inactiveSubaccountIds = []

    for await (const subaccount of client.subaccounts.inactive.all()) {
        inactiveSubaccountIds.push(subaccount.id)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(inactiveSubaccountIds.sort()).toEqual([subaccount1.id, subaccount2.id].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list first page of inactive subaccounts', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.create(),
        client.subaccounts.deactivate(subaccount1.id),
        client.subaccounts.deactivate(subaccount2.id),
        client.subaccounts.deactivate(subaccount3.id)
    ]
    await Promise.all(promises)

    const firstPage = await client.subaccounts.inactive.firstPage()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(firstPage.items.map((item: any) => item.id).sort()).toEqual([subaccount1.id, subaccount2.id, subaccount3.id].sort())
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(firstPage.items.length).toBe(3)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list first page of inactive subaccounts with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.create(),
        client.subaccounts.deactivate(subaccount1.id),
        client.subaccounts.deactivate(subaccount2.id),
        client.subaccounts.deactivate(subaccount3.id)
    ]
    await Promise.all(promises)
    const firstPage = await client.subaccounts.inactive.firstPage(null, 2)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(firstPage.items.map((item: any) => item.id).sort()).toEqual([subaccount2.id, subaccount3.id].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list page after of inactive subaccounts', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.deactivate(subaccount1.id),
        client.subaccounts.deactivate(subaccount2.id),
        client.subaccounts.deactivate(subaccount3.id)
    ]
    await Promise.all(promises)
    const pageAfter = await client.subaccounts.inactive.pageAfter(subaccount3.id)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect([pageAfter.items[0].id, pageAfter.items[1].id].sort()).toEqual([subaccount1.id, subaccount2.id].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list page after of inactive subaccounts with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.deactivate(subaccount2.id),
        client.subaccounts.deactivate(subaccount3.id)
    ]
    await Promise.all(promises)
    const pageAfter = await client.subaccounts.inactive.pageAfter(subaccount3.id, null, 1)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(pageAfter.items[0].id).toEqual(subaccount2.id)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list page before of inactive subaccounts', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.deactivate(subaccount1.id),
        client.subaccounts.deactivate(subaccount2.id),
        client.subaccounts.deactivate(subaccount3.id)
    ]
    await Promise.all(promises)
    const pageAfter = await client.subaccounts.inactive.pageBefore(subaccount1.id)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect([pageAfter.items[0].id, pageAfter.items[1].id].sort()).toEqual([subaccount2.id, subaccount3.id].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list page before of inactive subaccounts with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.create(),
        client.subaccounts.deactivate(subaccount1.id),
        client.subaccounts.deactivate(subaccount2.id)
    ]
    await Promise.all(promises)
    const pageAfter = await client.subaccounts.inactive.pageBefore(subaccount1.id, null, 1)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(pageAfter.items[0].id).toEqual(subaccount2.id)
})
