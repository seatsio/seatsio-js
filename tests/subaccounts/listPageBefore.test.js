test('should list subaccounts before given subaccount id', async () => {
    jest.setTimeout(20000);
    let subaccount1 = await client.subaccounts.create();
    let subaccount2 = await client.subaccounts.create();
    let subaccount3 = await client.subaccounts.create();

    let page = await client.subaccounts.listPageBefore(subaccount1.id);

    let subaccountKeys = [page.items[0].secretKey, page.items[1].secretKey];
    expect(subaccountKeys.sort()).toEqual([subaccount3.secretKey, subaccount2.secretKey].sort());
});

test('should list subaccounts before given subaccount id with page size', async () => {
    jest.setTimeout(20000);
    let subaccount1 = await client.subaccounts.create();
    let subaccount2 = await client.subaccounts.create();
    await client.subaccounts.create();

    let page = await client.subaccounts.listPageBefore(subaccount1.id, 1);

    expect(page.items[0].secretKey).toEqual(subaccount2.secretKey);
    expect(page.items.length).toBe(1);
});