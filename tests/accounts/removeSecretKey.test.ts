import { TestUtils } from '../testUtils.js'

test('should remove a secret key', async () => {
    const { client } = await TestUtils.createTestUserAndClient()

    const initialAccount = await client.accounts.retrieveMyAccount()
    const originalSecretKey = initialAccount.secretKey

    const newSecretKey = await client.accounts.addSecretKey()
    expect(newSecretKey).toBeTruthy()

    await client.accounts.removeSecretKey(originalSecretKey)

    const updatedAccount = await TestUtils.createClient(newSecretKey).accounts.retrieveMyAccount()
    expect(updatedAccount.secretKeys).not.toContain(originalSecretKey)
    expect(updatedAccount.secretKeys).toContain(newSecretKey)
})
