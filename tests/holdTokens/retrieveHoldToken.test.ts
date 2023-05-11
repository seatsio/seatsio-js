// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should retrieve hold tokens', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const holdToken = await client.holdTokens.create()

    const retrievedToken = await client.holdTokens.retrieve(holdToken.holdToken)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedToken.holdToken).toBe(holdToken.holdToken)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedToken.expiresAt).toEqual(holdToken.expiresAt)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedToken.expiresAt instanceof Date).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(holdToken.expiresInSeconds).toBeGreaterThanOrEqual(14 * 60)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(holdToken.expiresInSeconds).toBeLessThanOrEqual(15 * 60)
})
