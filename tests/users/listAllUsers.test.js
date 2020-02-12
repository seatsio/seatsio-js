const testUtils = require('../testUtils.js')

test('list all users', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const userIds = []
    for await (const user of client.users.listAll('COMPANY_ADMIN')) {
        userIds.push(user.id)
    }

    expect(userIds).toEqual([user.id])
})
