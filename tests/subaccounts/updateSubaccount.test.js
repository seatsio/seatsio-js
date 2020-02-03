const testUtils = require('../testUtils.js')

test('should update subaccount', async () => {
    let subaccount = await client.subaccounts.create('joske')

    await client.subaccounts.update(subaccount.id, 'jefke')

    let retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(retrievedSubaccount.name).toBe('jefke')
})

test('email is optional', async () => {
    let email = testUtils.getRandomEmail()
    let subaccount = await client.subaccounts.create(email, 'joske')

    await client.subaccounts.update(subaccount.id, 'jefke')

    let retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(retrievedSubaccount.name).toBe('jefke')
    expect(retrievedSubaccount.email).toBeFalsy()
})

test('name is not changed when updating with name=null', async () => {
    let subaccount = await client.subaccounts.create('joske')

    await client.subaccounts.update(subaccount.id, null)

    let retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(retrievedSubaccount.name).toBe('joske')
})
