const testUtils = require('../testUtils.js');

test('getAll with more than 20 subaccounts', async ()=> {
  jest.setTimeout(30000);
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var subaccountKeys = [];
  for(var i = 0; i < 55; i++){
    var subaccount = await client.subaccounts.create(i.toString());
    subaccountKeys.push(subaccount.key);
  }

  var subaccountPages = client.subaccounts.getAll();
  var retrievedSubaccountKeys = [];
  for await(subaccountPage of subaccountPages){
    for (let subaccount of subaccountPage){
      retrievedSubaccountKeys.push(subaccount.key);
    }
  }

  expect(retrievedSubaccountKeys.sort()).toEqual(subaccountKeys.sort());
});
