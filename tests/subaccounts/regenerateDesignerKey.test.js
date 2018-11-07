const testUtils = require('../testUtils.js');

test('should regenerate designer key', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var subaccount = await client.subaccounts.create();
    var newDesignerKey = await client.subaccounts.regenerateDesignerKey(subaccount.id);
    var retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id);

    expect(newDesignerKey.designerKey).toBeDefined();
    expect(subaccount.designerKey).not.toBe(newDesignerKey.designerKey);
    expect(retrievedSubaccount.designerKey).toBe(newDesignerKey.designerKey);
});
