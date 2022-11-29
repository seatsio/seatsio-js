const testUtils = require('../testUtils')

test('invite users', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const email = testUtils.getRandomEmail()

    const invitation = await client.users.invite(email, 'COMPANY_ADMIN')

    const invitations = await client.invitations.listAll()
    expect(invitations.length).toBe(1)
    expect(invitation.email).toBe(email)
    expect(invitation.id).toBeTruthy()
    expect(invitation.status).toBe('PENDING')
})

test('invite non admin users', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const email = testUtils.getRandomEmail()
    const workspace = await client.workspaces.create('a workspace')
    const workspace2 = await client.workspaces.create('another workspace')

    const invitation = await client.users.invite(email, 'NON_ADMIN', [workspace.key, workspace2.key])

    const invitations = await client.invitations.listAll()
    expect(invitations.length).toBe(1)
    expect(invitation.email).toBe(email)
})
