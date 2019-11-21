const testUtils = require('../testUtils')

test('activate user', async () => {
    const user = await client.users.invite(testUtils.getRandomEmail(), 'COMPANY_ADMIN')

    await client.users.activate(user.id)

    const retrievedUser = await client.users.retrieve(user.id)
    expect(retrievedUser.isActive).toBe(true)
    expect(retrievedUser.status).toBe('ACTIVE')
})
