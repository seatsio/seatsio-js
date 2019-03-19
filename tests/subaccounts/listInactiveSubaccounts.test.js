test('should list all inactive subaccounts', async () => {
  let subaccount1 = await client.subaccounts.create()
  let subaccount2 = await client.subaccounts.create()
  await client.subaccounts.create()
  await client.subaccounts.deactivate(subaccount1.id)
  await client.subaccounts.deactivate(subaccount2.id)
  let inactiveSubaccountIds = []

  for await (let subaccount of client.subaccounts.inactive.all()) {
    inactiveSubaccountIds.push(subaccount.id)
  }

  expect(inactiveSubaccountIds.sort()).toEqual([subaccount1.id, subaccount2.id].sort())
})

test('should list first page of inactive subaccounts', async () => {
  let subaccount1 = await client.subaccounts.create()
  let subaccount2 = await client.subaccounts.create()
  let subaccount3 = await client.subaccounts.create()
  await client.subaccounts.create()
  await client.subaccounts.deactivate(subaccount1.id)
  await client.subaccounts.deactivate(subaccount2.id)
  await client.subaccounts.deactivate(subaccount3.id)

  let firstPage = await client.subaccounts.inactive.firstPage()

  expect(firstPage.items.map(item => item.id).sort()).toEqual([subaccount1.id, subaccount2.id, subaccount3.id].sort())
  expect(firstPage.items.length).toBe(3)
})

test('should list first page of inactive subaccounts with page size', async () => {
  let subaccount1 = await client.subaccounts.create()
  let subaccount2 = await client.subaccounts.create()
  let subaccount3 = await client.subaccounts.create()
  await client.subaccounts.create()
  await client.subaccounts.deactivate(subaccount1.id)
  await client.subaccounts.deactivate(subaccount2.id)
  await client.subaccounts.deactivate(subaccount3.id)

  let firstPage = await client.subaccounts.inactive.firstPage(null, 2)

  expect(firstPage.items.map(item => item.id).sort()).toEqual([subaccount2.id, subaccount3.id].sort())
})

test('should list page after of inactive subaccounts', async () => {
  let subaccount1 = await client.subaccounts.create()
  let subaccount2 = await client.subaccounts.create()
  let subaccount3 = await client.subaccounts.create()
  await client.subaccounts.deactivate(subaccount1.id)
  await client.subaccounts.deactivate(subaccount2.id)
  await client.subaccounts.deactivate(subaccount3.id)

  let pageAfter = await client.subaccounts.inactive.pageAfter(subaccount3.id)

  expect([pageAfter.items[0].id, pageAfter.items[1].id].sort()).toEqual([subaccount1.id, subaccount2.id].sort())
})

test('should list page after of inactive subaccounts with page size', async () => {
  await client.subaccounts.create()
  let subaccount2 = await client.subaccounts.create()
  let subaccount3 = await client.subaccounts.create()
  await client.subaccounts.deactivate(subaccount2.id)
  await client.subaccounts.deactivate(subaccount3.id)

  let pageAfter = await client.subaccounts.inactive.pageAfter(subaccount3.id, null, 1)

  expect(pageAfter.items[0].id).toEqual(subaccount2.id)
})

test('should list page before of inactive subaccounts', async () => {
  let subaccount1 = await client.subaccounts.create()
  let subaccount2 = await client.subaccounts.create()
  let subaccount3 = await client.subaccounts.create()
  await client.subaccounts.deactivate(subaccount1.id)
  await client.subaccounts.deactivate(subaccount2.id)
  await client.subaccounts.deactivate(subaccount3.id)

  let pageAfter = await client.subaccounts.inactive.pageBefore(subaccount1.id)

  expect([pageAfter.items[0].id, pageAfter.items[1].id].sort()).toEqual([subaccount2.id, subaccount3.id].sort())
})

test('should list page before of inactive subaccounts with page size', async () => {
  let subaccount1 = await client.subaccounts.create()
  let subaccount2 = await client.subaccounts.create()
  await client.subaccounts.create()
  await client.subaccounts.deactivate(subaccount1.id)
  await client.subaccounts.deactivate(subaccount2.id)

  let pageAfter = await client.subaccounts.inactive.pageBefore(subaccount1.id, null, 1)

  expect(pageAfter.items[0].id).toEqual(subaccount2.id)
})
