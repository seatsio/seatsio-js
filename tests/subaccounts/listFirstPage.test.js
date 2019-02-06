test('should list subaccounts in first page', async () => {
  let subaccountIds = []
  for (let i = 0; i < 50; i++) {
    let subaccount = await client.subaccounts.create()
    subaccountIds.push(subaccount.id)
  }

  let page = await client.subaccounts.listFirstPage()

  let retrievedSubaccountIds = page.items.map((subaccount) => subaccount.id)
  expect(subaccountIds.sort()).toEqual(retrievedSubaccountIds.sort())
})

test('should list subaccounts in first page with page size', async () => {
  let subaccountIds = []
  for (let i = 0; i < 50; i++) {
    let subaccount = await client.subaccounts.create()
    subaccountIds.push(subaccount.id)
  }

  let page = await client.subaccounts.listFirstPage(null, 3)

  let retrievedSubaccountIds = page.items.map((subaccount) => subaccount.id)
  expect([subaccountIds[49], subaccountIds[48], subaccountIds[47]].sort()).toEqual(retrievedSubaccountIds.sort())
  expect(page.nextPageStartsAfter).toEqual(subaccountIds[47] + '')
  expect(page.previousPageEndsBefore).toBeNull()
})