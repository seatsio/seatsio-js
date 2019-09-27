const testUtils = require('./testUtils.js')

test('account ID can be passed in', async () => {
    let subaccount = await client.subaccounts.create()

    let subaccountClient = testUtils.createClient(user.secretKey, subaccount.accountId)
    let holdToken = await subaccountClient.holdTokens.create()

    expect(holdToken.accountId).toBe(subaccount.accountId)
})
