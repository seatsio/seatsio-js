import { TestUtils } from '../testUtils.js'

test('should add a secret key', async () => {
    const { client } = await TestUtils.createTestUserAndClient()

    const initialAccount = await client.accounts.retrieveMyAccount()
    const originalSecretKey = initialAccount.secretKey

    const newSecretKey = await client.accounts.addSecretKey()
    expect(newSecretKey).toBeTruthy()

    const updatedAccount = await TestUtils.createClient(newSecretKey).accounts.retrieveMyAccount()
    expect(updatedAccount.secretKeys).toContain(originalSecretKey)
    expect(updatedAccount.secretKeys).toContain(newSecretKey)
})
