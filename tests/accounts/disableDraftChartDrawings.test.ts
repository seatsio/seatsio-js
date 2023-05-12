import { TestUtils } from '../testUtils'

test('should disable draft chart drawings', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.accounts.enableDraftChartDrawings()

    await client.accounts.disableDraftChartDrawings()

    const account = await client.accounts.retrieveMyAccount()
    expect(account.settings.draftChartDrawingsEnabled).toBe(false)
})
