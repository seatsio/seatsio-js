const testUtils = require('../testUtils.js')

test('should update subaccount', async () => {
    let subaccount = await client.subaccounts.create('joske')
    let email = testUtils.getRandomEmail()

    await client.subaccounts.update(subaccount.id, 'jefke', email)

    let retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(retrievedSubaccount.name).toBe('jefke')
    expect(retrievedSubaccount.email).toBe(undefined)
})

test('email is optional', async () => {
    let email = testUtils.getRandomEmail()
    let subaccount = await client.subaccounts.createWithEmail(email, 'joske')

    await client.subaccounts.update(subaccount.id, 'jefke')

    let retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(retrievedSubaccount.name).toBe('jefke')
    expect(retrievedSubaccount.email).toBe(undefined)
})

test('name is not changed when updating with name=null', async () => {
    let email = testUtils.getRandomEmail()
    let subaccount = await client.subaccounts.create('joske')

    await client.subaccounts.update(subaccount.id, null, email)

    let retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(retrievedSubaccount.name).toBe('joske')
    expect(retrievedSubaccount.email).toBe(undefined)
})
