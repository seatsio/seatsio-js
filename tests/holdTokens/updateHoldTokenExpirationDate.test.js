const testUtils = require('../testUtils.js')

test('should update hold token expiration date', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
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
