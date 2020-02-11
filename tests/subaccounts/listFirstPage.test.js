const testUtils = require('../testUtils.js')

test('should list subaccounts in first page', async () => {
    let subaccounts = await testUtils.createArray(50, () => client.subaccounts.create())

    let page = await client.subaccounts.listFirstPage()

    let retrievedSubaccountIds = page.items.map((subaccount) => subaccount.id)
    let subaccountIds = subaccounts.map(s => s.id).concat(user.mainWorkspace.primaryUser.id)
    expect(retrievedSubaccountIds.sort()).toEqual(subaccountIds.sort())
})

test('should list subaccounts in first page with page size', async () => {
    await testUtils.createArray(47, () => client.subaccounts.create())
    let subaccount48 = await client.subaccounts.create()
    let subaccount49 = await client.subaccounts.create()
    let subaccount50 = await client.subaccounts.create()

    let page = await client.subaccounts.listFirstPage(null, 3)

    let retrievedSubaccountIds = page.items.map((subaccount) => subaccount.id)
    expect(retrievedSubaccountIds).toEqual([subaccount50.id, subaccount49.id, subaccount48.id])
    expect(page.nextPageStartsAfter).toEqual(subaccount48.id + '')
    expect(page.previousPageEndsBefore).toBeNull()
})
