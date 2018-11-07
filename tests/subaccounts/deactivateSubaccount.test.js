const testUtils = require('../testUtils.js');

test('should deactivate subaccount', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var subaccount = await client.subaccounts.create();
    await client.subaccounts.deactivate(subaccount.id);
    var retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id);

    expect(retrievedSubaccount.active).toBe(false);
});
