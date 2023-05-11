// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('invite users', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const email1 = TestUtils.getRandomEmail()
    await client.users.invite(email1, 'COMPANY_ADMIN')
    const email2 = TestUtils.getRandomEmail()
    await client.users.invite(email2, 'COMPANY_ADMIN')

    const invitations = await client.invitations.listAll()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(invitations.length).toBe(2)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(invitations[0].email).toBe(email2)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(invitations[0].date).toBeInstanceOf(Date)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(invitations[1].email).toBe(email1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(invitations[1].date).toBeInstanceOf(Date)
})
