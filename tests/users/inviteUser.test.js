const testUtils = require('../testUtils')

test('invite users', async () => {
    const email = testUtils.getRandomEmail()
    const user = await client.users.invite(email, 'COMPANY_ADMIN')

    expect(user.id).toBeTruthy()
    expect(user.email).toBe(email)
    expect(user.isActive).toBe(false)
    expect(user.status).toBe('INVITATION_PENDING')
    expect(user.role).toBe('COMPANY_ADMIN')
    expect(user.secretKey).toBeTruthy()
    expect(user.designerKey).toBeTruthy()
    expect(user.createdOn).toBeInstanceOf(Date)
})
