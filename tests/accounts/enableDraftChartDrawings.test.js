const testUtils = require('../testUtils.js')

test('should enable draft chart drawings', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    await client.accounts.disableDraftChartDrawings()

    await client.accounts.enableDraftChartDrawings()

    const account = await client.accounts.retrieveMyAccount()
    expect(account.settings.draftChartDrawingsEnabled).toBe(true)
})
