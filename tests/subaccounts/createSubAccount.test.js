const testUtils = require('../testUtils.js')

test('should create subaccount', async () => {
    let subaccount = await client.subaccounts.create('subaccountTest')

    expect(subaccount.secretKey).toBeTruthy()
    expect(subaccount.designerKey).toBeTruthy()
    expect(subaccount.publicKey).toBeTruthy()
    expect(subaccount.name).toBe('subaccountTest')
    expect(subaccount.active).toBe(true)
})

test('name is generated in subaccount create', async () => {
    let subaccount = await client.subaccounts.create()

    expect(subaccount.name).toBeTruthy()
})

test('subaccount create with email parameter', async () => {
    let randomEmail = testUtils.getRandomEmail()

    let subaccount = await client.subaccounts.createWithEmail(randomEmail, null)

    expect(subaccount.secretKey).toBeTruthy()
    expect(subaccount.designerKey).toBeTruthy()
    expect(subaccount.publicKey).toBeTruthy()
    expect(subaccount.email).toBeTruthy()
    expect(subaccount.name).toBeTruthy()
    expect(subaccount.email).toBe(randomEmail)
})

test('subaccount create with name and email', async () => {
    let randomEmail = testUtils.getRandomEmail()

    let subaccount = await client.subaccounts.createWithEmail(randomEmail, 'jeff')

    expect(subaccount.secretKey).toBeTruthy()
    expect(subaccount.designerKey).toBeTruthy()
    expect(subaccount.publicKey).toBeTruthy()
    expect(subaccount.email).toBeTruthy()
    expect(subaccount.name).toBe('jeff')
    expect(subaccount.email).toBe(randomEmail)
    expect(subaccount.active).toBe(true)
})
