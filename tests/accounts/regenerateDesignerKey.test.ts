// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should regenerate the designer key', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const newDesignerKey = await client.accounts.regenerateDesignerKey()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(newDesignerKey).not.toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(newDesignerKey).not.toBe(user.designerKey)
    const account = await client.accounts.retrieveMyAccount()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(newDesignerKey).toBe(account.designerKey)
})
