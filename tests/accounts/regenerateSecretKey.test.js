const testUtils = require('../testUtils.js')

test('should regenerate the secret key', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const newSecretKey = await client.accounts.regenerateSecretKey()

    expect(newSecretKey).not.toBeFalsy()
    expect(newSecretKey).not.toBe(user.secretKey)
    const account = await testUtils.createClient(newSecretKey).accounts.retrieveMyAccount()
    expect(newSecretKey).toBe(account.secretKey)
})
