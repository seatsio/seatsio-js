import { TestUtils } from '../testUtils'

test('updates a setting', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.accounts.updateSetting('VALIDATE_DUPLICATE_LABELS', 'OFF')

    const account = await client.accounts.retrieveMyAccount()
    expect(account.settings.chartValidation.VALIDATE_DUPLICATE_LABELS).toBe('OFF')
})
