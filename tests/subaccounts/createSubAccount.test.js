const testUtils = require('../testUtils.js');

test('should create subaccount', async () => {
    var subaccount = await client.subaccounts.create('subaccountTest');

    expect(subaccount.secretKey).toBeDefined();
    expect(subaccount.designerKey).toBeDefined();
    expect(subaccount.publicKey).toBeDefined();
    expect(subaccount.email).toBeDefined();
    expect(subaccount.name).toBe('subaccountTest');
    expect(subaccount.active).toBe(true);
});

test('name is optional in subaccount create', async () => {
    var subaccount = await client.subaccounts.create();

    expect(subaccount.name).toBeUndefined();
});

test('subaccount create with email parameter', async () => {
    var randomEmail = testUtils.getRandomEmail();
    var subaccount = await client.subaccounts.createWithEmail(randomEmail, null);

    expect(subaccount.secretKey).toBeDefined();
    expect(subaccount.designerKey).toBeDefined();
    expect(subaccount.publicKey).toBeDefined();
    expect(subaccount.email).toBeDefined();
    expect(subaccount.name).toBeUndefined();
    expect(subaccount.email).toBe(randomEmail);
});

test('subaccount create with name and email', async () => {
    var randomEmail = testUtils.getRandomEmail();
    var subaccount = await client.subaccounts.createWithEmail(randomEmail, 'jeff');

    expect(subaccount.secretKey).toBeDefined();
    expect(subaccount.designerKey).toBeDefined();
    expect(subaccount.publicKey).toBeDefined();
    expect(subaccount.email).toBeDefined();
    expect(subaccount.name).toBe('jeff');
    expect(subaccount.email).toBe(randomEmail);
    expect(subaccount.active).toBe(true);
});
