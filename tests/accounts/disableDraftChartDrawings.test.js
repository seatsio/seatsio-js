test('should disable draft chart drawings', async () => {
    await client.accounts.enableDraftChartDrawings();

    await client.accounts.disableDraftChartDrawings();

    let account = await client.accounts.retrieveMyAccount();
    expect(account.settings.draftChartDrawingsEnabled).toBe(false);
});
