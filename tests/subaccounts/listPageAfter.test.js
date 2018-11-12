test('should list subaccounts after given subaccount id', async () => {
    jest.setTimeout(20000);
    let subaccount1 = await client.subaccounts.create();
    let subaccount2 = await client.subaccounts.create();
    let subaccount3 = await client.subaccounts.create();

    let page = await client.subaccounts.listPageAfter(subaccount3.id);

    let subaccountKeys = [page.items[0].secretKey, page.items[1].secretKey];
    expect(subaccountKeys.sort()).toEqual([subaccount1.secretKey, subaccount2.secretKey].sort());
});

test('should list subaccounts after given subaccount id with page size', async () => {
    jest.setTimeout(20000);
    await client.subaccounts.create();
    let subaccount2 = await client.subaccounts.create();
    let subaccount3 = await client.subaccounts.create();

    let page = await client.subaccounts.listPageAfter(subaccount3.id, 1);

    expect(page.items[0].secretKey).toEqual(subaccount2.secretKey);
    expect(page.items.length).toBe(1);
});