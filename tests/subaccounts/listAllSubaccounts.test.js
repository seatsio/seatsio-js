const testUtils = require('../testUtils.js');

test('should list all subaccounts', async ()=> {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var subaccount1 = await client.subaccounts.create('I have a name.');
  var subaccount2 = await client.subaccounts.create();
  var subaccount3 = await client.subaccounts.create();
  var subaccounts = await client.subaccounts.listAll();
  var keys = [];
  for(let subaccount of subaccounts){
    keys.push(subaccount.id);
  }

  expect(keys).toContain(subaccount1.id);
  expect(keys).toContain(subaccount2.id);
  expect(keys).toContain(subaccount3.id);
});
