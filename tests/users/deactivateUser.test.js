const testUtils = require('../testUtils')

test('activate user', async () => {
    const user = await client.users.invite(testUtils.getRandomEmail(), 'COMPANY_ADMIN')
    await client.users.activate(user.id)

    await client.users.deactivate(user.id)

    const retrievedUser = await client.users.retrieve(user.id)
    expect(retrievedUser.isActive).toBe(false)
    expect(retrievedUser.status).toBe('INACTIVE')
})
