import { TestUtils } from '../testUtils'

test('should list subaccounts in first page', async () => {
    const { client, subaccount } = await TestUtils.createTestUserAndClient()
    const subaccounts = await TestUtils.createArray(3, () => client.subaccounts.create())

    const page = await client.subaccounts.listFirstPage()

    const retrievedSubaccountIds = page.items.map((subaccount: any) => subaccount.id)
    const subaccountIds = subaccounts.map(s => s.id).concat(subaccount.id)
        expect(retrievedSubaccountIds.sort()).toEqual(subaccountIds.sort())
})

test('should list subaccounts in first page with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await TestUtils.createArray(7, () => client.subaccounts.create())
    const subaccount8 = await client.subaccounts.create()
    const subaccount9 = await client.subaccounts.create()
    const subaccount10 = await client.subaccounts.create()

    const page = await client.subaccounts.listFirstPage(null, 3)

    const retrievedSubaccountIds = page.items.map((subaccount: any) => subaccount.id)
        expect(retrievedSubaccountIds).toEqual([subaccount10.id, subaccount9.id, subaccount8.id])
        expect(page.nextPageStartsAfter).toEqual(subaccount8.id + '')
        expect(page.previousPageEndsBefore).toBeNull()
})
