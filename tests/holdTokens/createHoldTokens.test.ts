// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should create hold tokens', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const now = new Date().getTime()
    const holdToken = await client.holdTokens.create()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(holdToken.expiresAt instanceof Date).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(holdToken.expiresAt.getTime()).toBeLessThanOrEqual((now + (60000 * 15)) + 60000)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(holdToken.expiresAt.getTime()).toBeGreaterThanOrEqual(now - 60000)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(holdToken.holdToken).toBeTruthy()
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should create hold token that expires in 1 minute', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const holdToken = await client.holdTokens.create(1)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(holdToken.expiresAt instanceof Date).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(holdToken.holdToken).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(holdToken.expiresInSeconds).toBeLessThanOrEqual(60)
})
