test('listAll subaccounts when there are more than 20 subaccounts', async () => {
    let subaccountIds = [], retrievedSubaccountIds = [];
    for (let i = 0; i < 55; i++) {
        let subaccount = await client.subaccounts.create();
        subaccountIds.push(subaccount.id);
    }

    for await(let subaccount of client.subaccounts.listAll()) {
        retrievedSubaccountIds.push(subaccount.id);
    }

    expect(retrievedSubaccountIds.sort()).toEqual(subaccountIds.sort());
});
