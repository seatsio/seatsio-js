import { TestUtils } from '../testUtils'

test('list all users', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const userIds = []
    for await (const user of client.users.listAll('COMPANY_ADMIN')) {
        userIds.push(user.id)
    }

    expect(userIds).toEqual([user.id])
})
