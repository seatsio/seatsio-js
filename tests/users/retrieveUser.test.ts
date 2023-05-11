// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('retrieves a single user', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const retrievedUser = await client.users.retrieve(user.id)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedUser.id).toBe(user.id)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedUser.secretKey).toBe(user.secretKey)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedUser.designerKey).toBe(user.designerKey)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedUser.email).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedUser.isActive).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedUser.status).toBe('ACTIVE')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedUser.createdOn).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedUser.role).toBe('COMPANY_ADMIN')
})
