const testUtils = require('../testUtils.js')

test('should regenerate secret key', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()

    const newSecretKey = await client.subaccounts.regenerateSecretKey(subaccount.id)

    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(newSecretKey.secretKey).toBeTruthy()
    expect(subaccount.secretKey).not.toBe(newSecretKey.secretKey)
    expect(retrievedSubaccount.secretKey).toBe(newSecretKey.secretKey)
})
