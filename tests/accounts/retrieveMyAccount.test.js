const testUtils = require('../testUtils.js');

test('should retrieve my account', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var myAccount = await client.accounts.retrieveMyAccount().catch((err) => console.log(err));

    expect(myAccount.secretKey).toBeDefined();
    expect(myAccount.secretKey).toBeTruthy();
    expect(myAccount.designerKey).toBeDefined();
    expect(myAccount.designerKey).toBeTruthy();
    expect(myAccount.publicKey).toBeDefined();
    expect(myAccount.publicKey).toBeTruthy();
    expect(myAccount.email).toBeDefined();
    expect(myAccount.email).toBeTruthy();
    expect(myAccount.settings.draftChartDrawingsEnabled).toBe(true);
    expect(myAccount.settings.chartValidation.VALIDATE_DUPLICATE_LABELS).toBe("ERROR");
    expect(myAccount.settings.chartValidation.VALIDATE_OBJECTS_WITHOUT_CATEGORIES).toBe("ERROR");
    expect(myAccount.settings.chartValidation.VALIDATE_UNLABELED_OBJECTS).toBe("ERROR");

});
