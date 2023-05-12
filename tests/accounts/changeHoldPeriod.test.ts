import { TestUtils } from '../testUtils'

test('should change the holdPeriod', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.accounts.changeHoldPeriod(14)

    const account = await client.accounts.retrieveMyAccount()
    expect(account.settings.holdPeriodInMinutes).toBe(14)
})
