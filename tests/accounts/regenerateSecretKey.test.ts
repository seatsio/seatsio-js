// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should regenerate the secret key', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const newSecretKey = await client.accounts.regenerateSecretKey()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(newSecretKey).not.toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(newSecretKey).not.toBe(user.secretKey)
    const account = await TestUtils.createClient(newSecretKey).accounts.retrieveMyAccount()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(newSecretKey).toBe(account.secretKey)
})
