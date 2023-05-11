// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
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
