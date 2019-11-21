const testUtils = require('../testUtils')

test('retrieves a single user', async () => {
    const email = testUtils.getRandomEmail()
    const user = await client.users.invite(email, 'COMPANY_ADMIN')

    const retrievedUser = await client.users.retrieve(user.id)

    expect(retrievedUser.id).toBe(user.id)
    expect(retrievedUser.secretKey).toBe(user.secretKey)
    expect(retrievedUser.designerKey).toBe(user.designerKey)
    expect(retrievedUser.email).toBe(email)
    expect(retrievedUser.isActive).toBe(false)
    expect(retrievedUser.status).toBe('INVITATION_PENDING')
    expect(retrievedUser.createdOn).toBeTruthy()
    expect(retrievedUser.role).toBe('COMPANY_ADMIN')
})
