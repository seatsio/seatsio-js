import { TestUtils } from '../testUtils'

test('retrieves a single user', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const retrievedUser = await client.users.retrieve(user.id)

    expect(retrievedUser.id).toBe(user.id)
    expect(retrievedUser.email).toBeTruthy()
    expect(retrievedUser.isActive).toBe(true)
    expect(retrievedUser.status).toBe('ACTIVE')
    expect(retrievedUser.createdOn).toBeTruthy()
    expect(retrievedUser.role).toBe('COMPANY_ADMIN')
})
