const testUtils = require('../testUtils.js');

test('should update subaccount', async ()=> {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var subaccount = await client.subaccounts.create('joske');
  var email = testUtils.getRandomEmail();
  await client.subaccounts.update(subaccount.id, 'jefke', email);
  var retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id);

  expect(retrievedSubaccount.name).toBe('jefke');
  expect(retrievedSubaccount.email).toBe(email);
});


test('email is optional', async ()=> {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var email = testUtils.getRandomEmail();
  var subaccount = await client.subaccounts.createWithEmail(email, 'joske');
  await client.subaccounts.update(subaccount.id, 'jefke');
  var retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id);

  expect(retrievedSubaccount.name).toBe('jefke');
  expect(retrievedSubaccount.email).toBe(email);
});

test('name is optional', async ()=> {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var email = testUtils.getRandomEmail();
  var subaccount = await client.subaccounts.create('joske');
  await client.subaccounts.update(subaccount.id, null, email);
  var retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id);

  expect(retrievedSubaccount.name).toBe('joske');
  expect(retrievedSubaccount.email).toBe(email);
});
