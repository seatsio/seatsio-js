const testUtils = require('../testUtils.js');

test('should retrieve my account', async () => {
    var myAccount = await client.accounts.retrieveMyAccount().catch((err) => console.log(err));

    expect(myAccount.secretKey).toBeTruthy();
    expect(myAccount.designerKey).toBeTruthy();
    expect(myAccount.publicKey).toBeTruthy();
    expect(myAccount.email).toBeTruthy();
    expect(myAccount.settings.draftChartDrawingsEnabled).toBe(true);
    expect(myAccount.settings.chartValidation.VALIDATE_DUPLICATE_LABELS).toBe("ERROR");
    expect(myAccount.settings.chartValidation.VALIDATE_OBJECTS_WITHOUT_CATEGORIES).toBe("ERROR");
    expect(myAccount.settings.chartValidation.VALIDATE_UNLABELED_OBJECTS).toBe("ERROR");
});
