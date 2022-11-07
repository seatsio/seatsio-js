const testUtils = require('../testUtils.js')

test('should change the password', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    await client.accounts.changePassword('someNewPassword')
})
