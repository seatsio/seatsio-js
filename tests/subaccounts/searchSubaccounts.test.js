test('should search subaccounts with special characters', async () => {
    let subaccountKeys = [], retrievedSubaccountKeys = [];

    for (let i = 0; i < 55; i++) {
        let subaccount = await client.subaccounts.create("test-/@/" + i);
        subaccountKeys.push(subaccount.secretKey);
    }

    for await(let subaccount of client.subaccounts.search('test-/@/4')) {
        retrievedSubaccountKeys.push(subaccount.secretKey);
    }

    expect(retrievedSubaccountKeys.length).toEqual(11);
});
