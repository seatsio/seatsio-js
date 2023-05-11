// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

test('should update hold token expiration date', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const d = new Date().toISOString()
    const lowerBound = new Date(d)
    const upperBound = new Date(d)
    lowerBound.setMinutes(lowerBound.getMinutes() + 30)
    upperBound.setMinutes(upperBound.getMinutes() + 31)
    const holdToken = await client.holdTokens.create()

    const updatedHoldToken = await client.holdTokens.expiresInMinutes(holdToken.holdToken, 30)

    expect(updatedHoldToken.holdToken).toBe(holdToken.holdToken)
    expect(lowerBound.getTime() <= updatedHoldToken.expiresAt.getTime()).toBe(true)
    expect(updatedHoldToken.expiresAt.getTime() <= upperBound.getTime()).toBe(true)
    expect(updatedHoldToken.expiresInSeconds).toBeGreaterThanOrEqual(29 * 60)
    expect(updatedHoldToken.expiresInSeconds).toBeLessThanOrEqual(30 * 60)
})
