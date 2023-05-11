// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list subaccounts in first page', async () => {
    const { client, subaccount } = await TestUtils.createTestUserAndClient()
    const subaccounts = await TestUtils.createArray(3, () => client.subaccounts.create())

    const page = await client.subaccounts.listFirstPage()

    const retrievedSubaccountIds = page.items.map((subaccount: any) => subaccount.id)
    const subaccountIds = subaccounts.map(s => s.id).concat(subaccount.id)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSubaccountIds.sort()).toEqual(subaccountIds.sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list subaccounts in first page with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await TestUtils.createArray(7, () => client.subaccounts.create())
    const subaccount8 = await client.subaccounts.create()
    const subaccount9 = await client.subaccounts.create()
    const subaccount10 = await client.subaccounts.create()

    const page = await client.subaccounts.listFirstPage(null, 3)

    const retrievedSubaccountIds = page.items.map((subaccount: any) => subaccount.id)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSubaccountIds).toEqual([subaccount10.id, subaccount9.id, subaccount8.id])
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.nextPageStartsAfter).toEqual(subaccount8.id + '')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.previousPageEndsBefore).toBeNull()
})
