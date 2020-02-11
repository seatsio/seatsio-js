const testUtils = require('../testUtils')

test('retrieves a single user', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const retrievedUser = await client.users.retrieve(user.id)

    expect(retrievedUser.id).toBe(user.id)
    expect(retrievedUser.secretKey).toBe(user.secretKey)
    expect(retrievedUser.designerKey).toBe(user.designerKey)
    expect(retrievedUser.email).toBeTruthy()
    expect(retrievedUser.isActive).toBe(true)
    expect(retrievedUser.status).toBe('ACTIVE')
    expect(retrievedUser.createdOn).toBeTruthy()
    expect(retrievedUser.role).toBe('COMPANY_ADMIN')
})
