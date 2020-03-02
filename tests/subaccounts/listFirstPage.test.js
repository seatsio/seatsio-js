const testUtils = require('../testUtils.js')

test('should list subaccounts in first page', async () => {
    const { client, subaccount } = await testUtils.createTestUserAndClient()
    const subaccounts = await testUtils.createArray(3, () => client.subaccounts.create())

    const page = await client.subaccounts.listFirstPage()

    const retrievedSubaccountIds = page.items.map((subaccount) => subaccount.id)
    const subaccountIds = subaccounts.map(s => s.id).concat(subaccount.id)
    expect(retrievedSubaccountIds.sort()).toEqual(subaccountIds.sort())
})

test('should list subaccounts in first page with page size', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    await testUtils.createArray(7, () => client.subaccounts.create())
    const subaccount8 = await client.subaccounts.create()
    const subaccount9 = await client.subaccounts.create()
    const subaccount10 = await client.subaccounts.create()

    const page = await client.subaccounts.listFirstPage(null, 3)

    const retrievedSubaccountIds = page.items.map((subaccount) => subaccount.id)
    expect(retrievedSubaccountIds).toEqual([subaccount10.id, subaccount9.id, subaccount8.id])
    expect(page.nextPageStartsAfter).toEqual(subaccount8.id + '')
    expect(page.previousPageEndsBefore).toBeNull()
})
