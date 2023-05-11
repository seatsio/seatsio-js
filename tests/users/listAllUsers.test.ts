// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('list all users', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const userIds = []
    for await (const user of client.users.listAll('COMPANY_ADMIN')) {
        userIds.push(user.id)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(userIds).toEqual([user.id])
})
