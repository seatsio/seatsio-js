const testUtils = require('../testUtils.js')

beforeEach(async () => {
    let subaccountPromises = testUtils.createArray(50, () => client.subaccounts.create())
    global.subaccounts = await Promise.all(subaccountPromises)
})

test('should list subaccounts in first page', async () => {
    let page = await client.subaccounts.listFirstPage()

    let retrievedSubaccountIds = page.items.map((subaccount) => subaccount.id)
    let subaccountIds = subaccounts.map(s => s.id).concat(user.mainWorkspace.primaryUser.id)
    expect(retrievedSubaccountIds.sort()).toEqual(subaccountIds.sort())
})

test('should list subaccounts in first page with page size', async () => {
    let subaccount51 = await client.subaccounts.create()
    let subaccount52 = await client.subaccounts.create()
    let subaccount53 = await client.subaccounts.create()

    let page = await client.subaccounts.listFirstPage(null, 3)

    let retrievedSubaccountIds = page.items.map((subaccount) => subaccount.id)
    expect(retrievedSubaccountIds).toEqual([subaccount53.id, subaccount52.id, subaccount51.id])
    expect(page.nextPageStartsAfter).toEqual(subaccount51.id + '')
    expect(page.previousPageEndsBefore).toBeNull()
})
