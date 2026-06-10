import { TestUtils } from '../testUtils.js'

test('should change the password', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.accounts.changePassword('someNewPassword')
})
