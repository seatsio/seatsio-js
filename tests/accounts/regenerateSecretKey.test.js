const testUtils = require('../testUtils.js')

test('should regenerate the secret key', async () => {
  let newSecretKey = await client.accounts.regenerateSecretKey()

  expect(newSecretKey).not.toBeFalsy()
  expect(newSecretKey).not.toBe(user.secretKey)
  let account = await testUtils.createClient(newSecretKey).accounts.retrieveMyAccount()
  expect(newSecretKey).toBe(account.secretKey)
})
