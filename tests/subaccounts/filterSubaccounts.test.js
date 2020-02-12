const testUtils = require('../testUtils.js')

test('should filter subaccounts ', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const retrievedSubaccountKeys = []

    let subaccount1 = await client.subaccounts.create('account1')
    let promises = [
        client.subaccounts.create('account2'),
        client.subaccounts.create('account3')
    ]
    await Promise.all(promises)

    for await (const subaccount of client.subaccounts.listAll('account1')) {
        retrievedSubaccountKeys.push(subaccount.secretKey)
    }

    expect(retrievedSubaccountKeys).toEqual([subaccount1.secretKey])
})

test('should filter subaccounts with special characters', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    let i = 0
    let subaccountPromises = testUtils.createArray(11, () => client.subaccounts.create('test-/@/' + i++))
    await Promise.all(subaccountPromises)

    let retrievedSubaccountKeys = []
    for await (let subaccount of client.subaccounts.listAll('test-/@/1')) {
        retrievedSubaccountKeys.push(subaccount.secretKey)
    }

    expect(retrievedSubaccountKeys.length).toEqual(2)
})

test('should filter with no results ', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const retrievedSubaccountKeys = []

    for await (const subaccount of client.subaccounts.listAll('account1')) {
        retrievedSubaccountKeys.push(subaccount.secretKey)
    }

    expect(retrievedSubaccountKeys).toEqual([])
})

test('should retrieve first page of subaccounts with filter', async () => {
    let promises = [
        client.subaccounts.create('account1'),
        client.subaccounts.create('account2'),
        client.subaccounts.create('account3'),
        client.subaccounts.create()
    ]
    let subaccounts = await Promise.all(promises)

    const page = await client.subaccounts.listFirstPage('account')
    const retrievedSubaccountKeys = page.items.map(subaccount => subaccount.secretKey)

    expect(retrievedSubaccountKeys.sort).toEqual([subaccounts[0].secretKey, subaccounts[1].secretKey, subaccounts[2].secretKey].sort)
})

test('should retrieve page after given subaccount id with filter', async () => {
    let subaccount1 = await client.subaccounts.create('test-/@/11')
    let subaccount2 = await client.subaccounts.create('test-/@/12')
    let subaccount3 = await client.subaccounts.create('test-/@/33')
    let promises = [
        client.subaccounts.create('test-/@/4'),
        client.subaccounts.create('test-/@/5'),
        client.subaccounts.create('test-/@/6'),
        client.subaccounts.create('test-/@/7'),
        client.subaccounts.create('test-/@/8')
    ]
    await Promise.all(promises)

    const page = await client.subaccounts.listPageAfter(subaccount3.id, 'test-/@/1')
    const retrievedSubaccountKeys = page.items.map(subaccount => subaccount.secretKey)

    expect(retrievedSubaccountKeys.sort).toEqual([subaccount1.secretKey, subaccount2.secretKey].sort)
    expect(page.previousPageEndsBefore).toEqual(subaccount2.id + '')
    expect(page.nextPageStartsAfter).toBeNull()
})

test('should should retrieve page before given subaccount id with filter', async () => {
    let subaccount1 = await client.subaccounts.create('test-/@/11')
    let subaccount2 = await client.subaccounts.create('test-/@/12')
    let subaccount3 = await client.subaccounts.create('test-/@/13')
    let promises = [
        client.subaccounts.create('test-/@/4'),
        client.subaccounts.create('test-/@/5'),
        client.subaccounts.create('test-/@/6'),
        client.subaccounts.create('test-/@/7'),
        client.subaccounts.create('test-/@/8')
    ]
    await Promise.all(promises)

    const page = await client.subaccounts.listPageBefore(subaccount1.id, 'test-/@/1')
    const retrievedSubaccountKeys = page.items.map(subaccount => subaccount.secretKey)

    expect(retrievedSubaccountKeys.sort).toEqual([subaccount2.secretKey, subaccount3.secretKey].sort)
    expect(page.previousPageEndsBefore).toBeNull()
    expect(page.nextPageStartsAfter).toEqual(subaccount2.id + '')
})
