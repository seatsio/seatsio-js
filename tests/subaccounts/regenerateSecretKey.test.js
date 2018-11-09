test('should regenerate secret key', async () => {
    let subaccount = await client.subaccounts.create();

    let newSecretKey = await client.subaccounts.regenerateSecretKey(subaccount.id);

    let retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id);
    expect(newSecretKey.secretKey).toBeTruthy();
    expect(subaccount.secretKey).not.toBe(newSecretKey.secretKey);
    expect(retrievedSubaccount.secretKey).toBe(newSecretKey.secretKey);
});
