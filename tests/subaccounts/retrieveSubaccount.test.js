const testUtils = require('../testUtils.js');

test('should retrieve subaccount', async () => {
    var subaccount = await client.subaccounts.create('joske');
    var retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id);

    expect(retrievedSubaccount.id).toBe(subaccount.id);
    expect(retrievedSubaccount.secretKey).toBeDefined();
    expect(retrievedSubaccount.designerKey).toBeDefined();
    expect(retrievedSubaccount.publicKey).toBeDefined();
    expect(retrievedSubaccount.name).toBe('joske');
    expect(retrievedSubaccount.active).toBe(true);
});
