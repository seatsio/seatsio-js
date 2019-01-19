test('updates a setting', async () => {
    await client.accounts.updateSetting("VALIDATE_DUPLICATE_LABELS", "OFF");

    let account = await client.accounts.retrieveMyAccount();
    expect(account.settings.chartValidation.VALIDATE_DUPLICATE_LABELS).toBe("OFF");
});
