import { TestUtils } from '../testUtils'

test('should enable draft chart drawings', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.accounts.disableDraftChartDrawings()

    await client.accounts.enableDraftChartDrawings()

    const account = await client.accounts.retrieveMyAccount()
    expect(account.settings.draftChartDrawingsEnabled).toBe(true)
})
