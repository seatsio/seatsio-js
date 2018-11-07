const testUtils = require('../testUtils.js');

test('should deactivate subaccount', async () => {
    var subaccount = await client.subaccounts.create();
    await client.subaccounts.deactivate(subaccount.id);
    var retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id);

    expect(retrievedSubaccount.active).toBe(false);
});
