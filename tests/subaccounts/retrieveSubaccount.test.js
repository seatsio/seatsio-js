const testUtils = require('../testUtils.js')

test('should retrieve subaccount', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create('joske')

    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)

    expect(retrievedSubaccount.id).toBe(subaccount.id)
    expect(retrievedSubaccount.secretKey).toBeTruthy()
    expect(retrievedSubaccount.designerKey).toBeTruthy()
    expect(retrievedSubaccount.publicKey).toBeTruthy()
    expect(retrievedSubaccount.name).toBe('joske')
    expect(retrievedSubaccount.active).toBe(true)
})
