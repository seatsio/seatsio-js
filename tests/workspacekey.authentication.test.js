const testUtils = require('./testUtils.js')

test('workspace key can be passed in', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()

    const subaccountClient = testUtils.createClient(user.secretKey, subaccount.workspace.key)
    const holdToken = await subaccountClient.holdTokens.create()

    expect(holdToken.workspaceKey).toBe(subaccount.workspace.key)
})
