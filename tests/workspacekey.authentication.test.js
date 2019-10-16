const testUtils = require('./testUtils.js')

test('workspace key can be passed in', async () => {
    let subaccount = await client.subaccounts.create()

    let subaccountClient = testUtils.createClient(user.secretKey, subaccount.workspace.key)
    let holdToken = await subaccountClient.holdTokens.create()

    expect(holdToken.workspaceKey).toBe(subaccount.workspace.key)
})
