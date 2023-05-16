import { TestUtils } from '../testUtils'

test('should regenerate the secret key', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const newSecretKey = await client.accounts.regenerateSecretKey()

    expect(newSecretKey).not.toBeFalsy()
    expect(newSecretKey).not.toBe(user.secretKey)
    const account = await TestUtils.createClient(newSecretKey).accounts.retrieveMyAccount()
    expect(newSecretKey).toBe(account.secretKey)
})
