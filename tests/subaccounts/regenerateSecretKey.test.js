const testUtils = require('../testUtils.js');

test('should regenerate secret key', async ()=> {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var subaccount = await client.subaccounts.create();
  var newSecretKey = await client.subaccounts.regenerateSecretKey(subaccount.id);
  var retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id);

  expect(newSecretKey.secretKey).toBeDefined();
  expect(subaccount.secretKey).not.toBe(newSecretKey.secretKey);
  expect(retrievedSubaccount.secretKey).toBe(newSecretKey.secretKey);
});
