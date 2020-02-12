const testUtils = require('../testUtils')

test('invite users', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const email = testUtils.getRandomEmail()

    await client.users.invite(email, 'COMPANY_ADMIN')

    const invitations = await client.invitations.listAll()
    expect(invitations.length).toBe(1)
    expect(invitations[0].email).toBe(email)
})

test('invite non admin users', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const email = testUtils.getRandomEmail()
    const workspace = await client.workspaces.create('a workspace')
    const workspace2 = await client.workspaces.create('another workspace')

    await client.users.invite(email, 'NON_ADMIN', [workspace.key, workspace2.key])

    const invitations = await client.invitations.listAll()
    expect(invitations.length).toBe(1)
    expect(invitations[0].email).toBe(email)
})
