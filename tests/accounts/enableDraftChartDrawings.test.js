test('should enable draft chart drawings', async () => {
    await client.accounts.disableDraftChartDrawings()

    await client.accounts.enableDraftChartDrawings()

    let account = await client.accounts.retrieveMyAccount()
    expect(account.settings.draftChartDrawingsEnabled).toBe(true)
})
