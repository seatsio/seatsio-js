const testUtils = require('./testUtils.js')

test('workspace key can be passed in', async () => {
    let subaccount = await client.subaccounts.create()

    let subaccountClient = testUtils.createClient(user.secretKey, subaccount.workspaceKey)
    let holdToken = await subaccountClient.holdTokens.create()

    expect(holdToken.workspaceKey).toBe(subaccount.workspaceKey)
})
