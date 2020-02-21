const testUtils = require('./testUtils.js')

test('workspace key can be passed in', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()

    const subaccountClient = testUtils.createClient(user.secretKey, subaccount.publicKey)
    const holdToken = await subaccountClient.holdTokens.create()

    expect(holdToken.workspaceKey).toBe(subaccount.publicKey)
})
