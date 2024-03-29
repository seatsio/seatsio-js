import { TestUtils } from '../testUtils'

test('invite users', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const email1 = TestUtils.getRandomEmail()
    await client.users.invite(email1, 'COMPANY_ADMIN')
    const email2 = TestUtils.getRandomEmail()
    await client.users.invite(email2, 'COMPANY_ADMIN')

    const invitations = await client.invitations.listAll()

    expect(invitations.length).toBe(2)
    expect(invitations[0].email).toBe(email2)
    expect(invitations[0].date).toBeInstanceOf(Date)
    expect(invitations[1].email).toBe(email1)
    expect(invitations[1].date).toBeInstanceOf(Date)
})
