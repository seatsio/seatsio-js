import { TestUtils } from './testUtils'

test('workspace key can be passed in', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()

    const subaccountClient = TestUtils.createClient(user.secretKey, subaccount.publicKey)
    const holdToken = await subaccountClient.holdTokens.create()

    expect(holdToken.workspaceKey).toBe(subaccount.publicKey)
})
