const testUtils = require('../testUtils.js')

test('should change the holdPeriod', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    await client.accounts.changeHoldPeriod(14)

    const account = await client.accounts.retrieveMyAccount()
    expect(account.settings.holdPeriodInMinutes).toBe(14)
})
