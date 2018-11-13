test('listAll subaccounts when there are more than 20 subaccounts', async () => {
    let subaccountKeys = [], retrievedSubaccountKeys = [];
    for (let i = 0; i < 55; i++) {
        let subaccount = await client.subaccounts.create();
        subaccountKeys.push(subaccount.key);
    }

    for await(let subaccount of client.subaccounts.listAll()) {
        retrievedSubaccountKeys.push(subaccount.key);
    }

    expect(retrievedSubaccountKeys.sort()).toEqual(subaccountKeys.sort());
});
