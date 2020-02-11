const testUtils = require('../testUtils.js')

test('updates a setting', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    await client.accounts.updateSetting('VALIDATE_DUPLICATE_LABELS', 'OFF')

    const account = await client.accounts.retrieveMyAccount()
    expect(account.settings.chartValidation.VALIDATE_DUPLICATE_LABELS).toBe('OFF')
})
