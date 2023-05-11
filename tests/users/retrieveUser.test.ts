// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

test('retrieves a single user', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const retrievedUser = await client.users.retrieve(user.id)

    expect(retrievedUser.id).toBe(user.id)
    expect(retrievedUser.secretKey).toBe(user.secretKey)
    expect(retrievedUser.designerKey).toBe(user.designerKey)
    expect(retrievedUser.email).toBeTruthy()
    expect(retrievedUser.isActive).toBe(true)
    expect(retrievedUser.status).toBe('ACTIVE')
    expect(retrievedUser.createdOn).toBeTruthy()
    expect(retrievedUser.role).toBe('COMPANY_ADMIN')
})
