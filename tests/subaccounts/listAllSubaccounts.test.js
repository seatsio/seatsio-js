const testUtils = require('../testUtils.js')

test('listAll subaccounts when there are more than 20 subaccounts', async () => {
  let subaccountPromises = testUtils.createArray(55, () => client.subaccounts.create())
  let subaccounts = await Promise.all(subaccountPromises)

  let retrievedSubaccountIds = []
  for await (let subaccount of client.subaccounts.listAll()) {
    retrievedSubaccountIds.push(subaccount.id)
  }

  expect(retrievedSubaccountIds.sort()).toEqual(subaccounts.map(s => s.id).sort())
})
