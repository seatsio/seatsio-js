test('should list subaccounts before given subaccount id', async () => {
  let subaccount1 = await client.subaccounts.create()
  let subaccount2 = await client.subaccounts.create()
  let subaccount3 = await client.subaccounts.create()

  let page = await client.subaccounts.listPageBefore(subaccount1.id)

  let subaccountKeys = [page.items[0].id, page.items[1].id]
  expect(subaccountKeys.sort()).toEqual([subaccount3.id, subaccount2.id].sort())
})

test('should list subaccounts before given subaccount id with page size', async () => {
  let subaccount1 = await client.subaccounts.create()
  let subaccount2 = await client.subaccounts.create()
  await client.subaccounts.create()

  let page = await client.subaccounts.listPageBefore(subaccount1.id, null, 1)

  expect(page.items[0].id).toEqual(subaccount2.id)
  expect(page.items.length).toBe(1)
})
