import { TestUtils } from '../testUtils'

test('should regenerate secret key', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()

    const newSecretKey = await client.subaccounts.regenerateSecretKey(subaccount.id)

    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(newSecretKey.secretKey).toBeTruthy()
    expect(subaccount.secretKey).not.toBe(newSecretKey.secretKey)
    expect(retrievedSubaccount.secretKey).toBe(newSecretKey.secretKey)
})