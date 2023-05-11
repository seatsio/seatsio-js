import { TestUtils } from '../TestUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change the holdPeriod', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.accounts.changeHoldPeriod(14)

    const account = await client.accounts.retrieveMyAccount()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(account.settings.holdPeriodInMinutes).toBe(14)
})
