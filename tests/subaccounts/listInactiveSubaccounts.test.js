const testUtils = require('../testUtils.js');

test('should list all inactive subaccounts', async () => {
    let subaccount1 = await client.subaccounts.create();
    let subaccount2 = await client.subaccounts.create();
    await client.subaccounts.create();
    await client.subaccounts.deactivate(subaccount1.id);
    await client.subaccounts.deactivate(subaccount2.id);
    let inactiveSubaccountIds = [];

    for await(let subaccount of client.subaccounts.inactive) {
            inactiveSubaccountIds.push(subaccount.id);
    }

    expect(inactiveSubaccountIds.sort()).toEqual([subaccount1.id, subaccount2.id].sort());
});
