import { TestUtils } from '../testUtils'

test('should change the password', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.accounts.changePassword('someNewPassword')
})
