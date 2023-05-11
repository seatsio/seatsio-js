// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('invite users', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const email = TestUtils.getRandomEmail()

    const invitation = await client.users.invite(email, 'COMPANY_ADMIN')

    const invitations = await client.invitations.listAll()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(invitations.length).toBe(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(invitation.email).toBe(email)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(invitation.id).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(invitation.status).toBe('PENDING')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('invite non admin users', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const email = TestUtils.getRandomEmail()
    const workspace = await client.workspaces.create('a workspace')
    const workspace2 = await client.workspaces.create('another workspace')

    const invitation = await client.users.invite(email, 'NON_ADMIN', [workspace.key, workspace2.key])

    const invitations = await client.invitations.listAll()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(invitations.length).toBe(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(invitation.email).toBe(email)
})
