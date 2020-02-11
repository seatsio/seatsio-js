const testUtils = require('../testUtils.js')

test('should change the password', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    await client.accounts.changePassword('someNewPassword')
})
