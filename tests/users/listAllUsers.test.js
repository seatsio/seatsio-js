const testUtils = require('../testUtils')

test('list all users', async () => {
    const user1 = await client.users.invite(testUtils.getRandomEmail(), 'COMPANY_ADMIN')

    const userIds = []
    for await (const user of client.users.listAll('COMPANY_ADMIN')) {
        userIds.push(user.id)
    }

    expect(userIds).toEqual([user1.id, user.id])
})
