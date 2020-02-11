const testUtils = require('../testUtils.js')

test('listAll subaccounts when there are more than 20 subaccounts', async () => {
    let subaccounts = await testUtils.createArray(55, () => client.subaccounts.create())

    let retrievedSubaccountIds = []
    for await (let subaccount of client.subaccounts.listAll()) {
        retrievedSubaccountIds.push(subaccount.id)
    }

    let subaccountIDs = subaccounts.map(s => s.id).concat(user.mainWorkspace.primaryUser.id)
    expect(retrievedSubaccountIds.sort()).toEqual(subaccountIDs.sort())
})
