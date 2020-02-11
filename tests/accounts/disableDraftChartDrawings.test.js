const testUtils = require('../testUtils.js')

test('should disable draft chart drawings', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    await client.accounts.enableDraftChartDrawings()

    await client.accounts.disableDraftChartDrawings()

    const account = await client.accounts.retrieveMyAccount()
    expect(account.settings.draftChartDrawingsEnabled).toBe(false)
})
