const SubaccountListParams = require('../../src/Subaccounts/SubaccountListParams.js')

test('should filter subaccounts ', async () => {
  let retrievedSubaccountKeys = []

  let subaccount1 = await client.subaccounts.create('account1')
  await client.subaccounts.create('account2')
  await client.subaccounts.create('account3')

  let params = new SubaccountListParams().withFilter('account1')
  for await(let subaccount of client.subaccounts.listAll(params)) {
    retrievedSubaccountKeys.push(subaccount.secretKey)
  }

  expect(retrievedSubaccountKeys).toEqual([subaccount1.secretKey])
})

test('should filter subaccounts with special characters', async () => {
  let subaccountKeys = [], retrievedSubaccountKeys = []

  for (let i = 0; i < 55; i++) {
    let subaccount = await client.subaccounts.create("test-/@/" + i)
    subaccountKeys.push(subaccount.secretKey)
  }

  let params = new SubaccountListParams().withFilter('test-/@/4')
  for await(let subaccount of client.subaccounts.listAll(params)) {
    retrievedSubaccountKeys.push(subaccount.secretKey)
  }

  expect(retrievedSubaccountKeys.length).toEqual(11)
})

test('should filter with no results ', async () => {
  let retrievedSubaccountKeys = []

  let params = new SubaccountListParams().withFilter('account1')
  for await(let subaccount of client.subaccounts.listAll(params)) {
    retrievedSubaccountKeys.push(subaccount.secretKey)
  }

  expect(retrievedSubaccountKeys).toEqual([])
})

test('should retrieve first page of subaccounts with filter', async () => {
  let subaccount1 = await client.subaccounts.create('account1')
  let subaccount2 = await client.subaccounts.create('account2')
  let subaccount3 = await client.subaccounts.create('account3')
  await client.subaccounts.create()

  let params = new SubaccountListParams().withFilter('account')
  let page = await client.subaccounts.listFirstPage(params)
  let retrievedSubaccountKeys = page.items.map(subaccount => subaccount.secretKey)

  expect(retrievedSubaccountKeys.sort).toEqual([subaccount1.secretKey, subaccount2.secretKey, subaccount3.secretKey].sort)
})

test('should retrieve page after given subaccount id with filter', async () => {
  let subaccount1 = await client.subaccounts.create('test-/@/11')
  let subaccount2 = await client.subaccounts.create('test-/@/12')
  let subaccount3 = await client.subaccounts.create('test-/@/33')
  await client.subaccounts.create('test-/@/4')
  await client.subaccounts.create('test-/@/5')
  await client.subaccounts.create('test-/@/6')
  await client.subaccounts.create('test-/@/7')
  await client.subaccounts.create('test-/@/8')

  let params = new SubaccountListParams().withFilter('test-/@/1')
  let page = await client.subaccounts.listPageAfter(subaccount3.id, params)
  let retrievedSubaccountKeys = page.items.map(subaccount => subaccount.secretKey)

  expect(retrievedSubaccountKeys.sort).toEqual([subaccount1.secretKey, subaccount2.secretKey].sort)
  expect(page.previousPageEndsBefore).toEqual(subaccount2.id + "")
  expect(page.nextPageStartsAfter).toBeNull()
})

test('should should retrieve page before given subaccount id with filter', async () => {
  let subaccount1 = await client.subaccounts.create('test-/@/11')
  let subaccount2 = await client.subaccounts.create('test-/@/12')
  let subaccount3 = await client.subaccounts.create('test-/@/13')
  await client.subaccounts.create('test-/@/4')
  await client.subaccounts.create('test-/@/5')
  await client.subaccounts.create('test-/@/6')
  await client.subaccounts.create('test-/@/7')
  await client.subaccounts.create('test-/@/8')


  let params = new SubaccountListParams().withFilter('test-/@/1')
  let page = await client.subaccounts.listPageBefore(subaccount1.id, params)
  let retrievedSubaccountKeys = page.items.map(subaccount => subaccount.secretKey)

  expect(retrievedSubaccountKeys.sort).toEqual([subaccount2.secretKey, subaccount3.secretKey].sort)
  expect(page.previousPageEndsBefore).toBeNull()
  expect(page.nextPageStartsAfter).toEqual(subaccount2.id + "")
})