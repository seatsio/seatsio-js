const testUtils = require('../testUtils.js')

test('should retrieve hold tokens', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const holdToken = await client.holdTokens.create()

    const retrievedToken = await client.holdTokens.retrieve(holdToken.holdToken)

    expect(retrievedToken.holdToken).toBe(holdToken.holdToken)
    expect(retrievedToken.expiresAt).toEqual(holdToken.expiresAt)
    expect(retrievedToken.expiresAt instanceof Date).toBe(true)
    expect(holdToken.expiresInSeconds).toBeGreaterThanOrEqual(14 * 60)
    expect(holdToken.expiresInSeconds).toBeLessThanOrEqual(15 * 60)
})
