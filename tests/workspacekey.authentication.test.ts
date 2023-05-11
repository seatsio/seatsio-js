// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from './TestUtils.js'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('workspace key can be passed in', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()

    const subaccountClient = TestUtils.createClient(user.secretKey, subaccount.publicKey)
    const holdToken = await subaccountClient.holdTokens.create()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(holdToken.workspaceKey).toBe(subaccount.publicKey)
})
