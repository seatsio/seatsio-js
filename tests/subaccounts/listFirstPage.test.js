const testUtils = require('../testUtils.js')

test('should list subaccounts in first page', async () => {
    let subaccountPromises = testUtils.createArray(10, () => client.subaccounts.create())
    let subaccounts = await Promise.all(subaccountPromises)
    let page = await client.subaccounts.listFirstPage()

    let retrievedSubaccountIds = page.items.map((subaccount) => subaccount.id)
    let subaccountIds = subaccounts.map(s => s.id).concat(user.mainWorkspace.primaryUser.id)
    expect(retrievedSubaccountIds.sort()).toEqual(subaccountIds.sort())
})

test('should list subaccounts in first page with page size', async () => {
    let subaccountPromises = testUtils.createArray(7, () => client.subaccounts.create())
    await Promise.all(subaccountPromises)
    let subaccount8 = await client.subaccounts.create()
    let subaccount9 = await client.subaccounts.create()
    let subaccount10 = await client.subaccounts.create()

    let page = await client.subaccounts.listFirstPage(null, 3)

    let retrievedSubaccountIds = page.items.map((subaccount) => subaccount.id)
    expect(retrievedSubaccountIds).toEqual([subaccount10.id, subaccount9.id, subaccount8.id])
    expect(page.nextPageStartsAfter).toEqual(subaccount8.id + '')
    expect(page.previousPageEndsBefore).toBeNull()
})
