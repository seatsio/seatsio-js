test('should list subaccounts in first page', async () => {
    jest.setTimeout(40000);
    let subaccountKeys = [];
    for (let i = 0; i < 50; i++) {
        let subaccount = await client.subaccounts.create();
        subaccountKeys.push(subaccount.key);
    }

    let page = await client.subaccounts.listFirstPage();

    let retrievedSubaccountKeys = page.items.map((subaccount) => subaccount.key);
    expect(subaccountKeys.sort()).toEqual(retrievedSubaccountKeys.sort());

});