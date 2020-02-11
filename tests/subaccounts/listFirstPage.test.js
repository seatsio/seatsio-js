const testUtils = require('../testUtils.js')

test('should list subaccounts in first page', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccounts = await testUtils.createArray(50, () => client.subaccounts.create())

    const page = await client.subaccounts.listFirstPage()

    const retrievedSubaccountIds = page.items.map((subaccount) => subaccount.id)
    const subaccountIds = subaccounts.map(s => s.id).concat(user.mainWorkspace.primaryUser.id)
    expect(retrievedSubaccountIds.sort()).toEqual(subaccountIds.sort())
})

test('should list subaccounts in first page with page size', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    await testUtils.createArray(47, () => client.subaccounts.create())
    const subaccount48 = await client.subaccounts.create()
    const subaccount49 = await client.subaccounts.create()
    const subaccount50 = await client.subaccounts.create()

    const page = await client.subaccounts.listFirstPage(null, 3)

    const retrievedSubaccountIds = page.items.map((subaccount) => subaccount.id)
    expect(retrievedSubaccountIds).toEqual([subaccount50.id, subaccount49.id, subaccount48.id])
    expect(page.nextPageStartsAfter).toEqual(subaccount48.id + '')
    expect(page.previousPageEndsBefore).toBeNull()
})
