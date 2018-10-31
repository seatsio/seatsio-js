const testUtils = require('../testUtils.js');

test('should list all active subaccounts', async ()=> {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var subaccount1 = await client.subaccounts.create('I have a name.');
  var subaccount2 = await client.subaccounts.create();
  var subaccount3 = await client.subaccounts.create();
  await client.subaccounts.deactivate(subaccount3.id);
  var activeSubaccounts = await client.subaccounts.active.all();

  var activeSubaccountIds = [];
  for(let subaccount of activeSubaccounts){
    activeSubaccountIds.push(subaccount.id);
  }

  expect(activeSubaccountIds).toContain(subaccount1.id);
  expect(activeSubaccountIds).toContain(subaccount2.id);
  expect(activeSubaccountIds).not.toContain(subaccount3.id);

});
