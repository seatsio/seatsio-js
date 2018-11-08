const testUtils = require('../testUtils.js');

test('should list all inactive subaccounts', async () => {
    let subaccount1 = await client.subaccounts.create('I have a name.');
    let subaccount2 = await client.subaccounts.create();
    let subaccount3 = await client.subaccounts.create();
    await client.subaccounts.deactivate(subaccount1.id);
    await client.subaccounts.deactivate(subaccount2.id);
    let inactiveSubaccountIds = [];

    for await(let subaccount of client.subaccounts.inactive) {
            inactiveSubaccountIds.push(subaccount.id);
    }

    expect(inactiveSubaccountIds).toContain(subaccount1.id);
    expect(inactiveSubaccountIds).toContain(subaccount2.id);
    expect(inactiveSubaccountIds).not.toContain(subaccount3.id);

});
