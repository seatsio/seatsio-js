// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

test('should retrieve hold tokens', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const holdToken = await client.holdTokens.create()

    const retrievedToken = await client.holdTokens.retrieve(holdToken.holdToken)

    expect(retrievedToken.holdToken).toBe(holdToken.holdToken)
    expect(retrievedToken.expiresAt).toEqual(holdToken.expiresAt)
    expect(retrievedToken.expiresAt instanceof Date).toBe(true)
    expect(holdToken.expiresInSeconds).toBeGreaterThanOrEqual(14 * 60)
    expect(holdToken.expiresInSeconds).toBeLessThanOrEqual(15 * 60)
})
