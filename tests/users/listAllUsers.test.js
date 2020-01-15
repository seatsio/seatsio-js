test('list all users', async () => {
    const userIds = []
    for await (const user of client.users.listAll('COMPANY_ADMIN')) {
        userIds.push(user.id)
    }

    expect(userIds).toEqual([user.id])
})
