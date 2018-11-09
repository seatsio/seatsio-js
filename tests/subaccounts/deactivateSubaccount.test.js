test('should deactivate subaccount', async () => {
    let subaccount = await client.subaccounts.create();
    await client.subaccounts.deactivate(subaccount.id);
    let retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id);

    expect(retrievedSubaccount.active).toBe(false);
});
