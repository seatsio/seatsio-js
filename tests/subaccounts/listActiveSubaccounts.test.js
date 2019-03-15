test('should list all active subaccounts', async () => {
  let subaccount1 = await client.subaccounts.create()
  let subaccount2 = await client.subaccounts.create()
  let subaccount3 = await client.subaccounts.create()
  await client.subaccounts.deactivate(subaccount3.id)
  let activeSubaccountIds = []

  for await (let subaccount of client.subaccounts.active.all()) {
    activeSubaccountIds.push(subaccount.id)
  }

  expect(activeSubaccountIds.sort()).toEqual([subaccount2.id, subaccount1.id].sort())
})
