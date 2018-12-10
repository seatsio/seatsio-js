const SubaccountListParams = require('../../src/Subaccounts/SubaccountListParams.js');

test('should filter subaccounts with special characters', async () => {
    let subaccountKeys = [], retrievedSubaccountKeys = [];

    for (let i = 0; i < 55; i++) {
        let subaccount = await client.subaccounts.create("test-/@/" + i);
        subaccountKeys.push(subaccount.secretKey);
    }

    let params = new SubaccountListParams().withFilter('test-/@/4');
    for await(let subaccount of client.subaccounts.listAll(params)) {
        retrievedSubaccountKeys.push(subaccount.secretKey);
    }

    expect(retrievedSubaccountKeys.length).toEqual(11);
});
