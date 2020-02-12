const testUtils = require('../testUtils.js')

test('should create hold tokens', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const now = new Date().getTime()
    const holdToken = await client.holdTokens.create()

    expect(holdToken.expiresAt instanceof Date).toBe(true)
    expect(holdToken.expiresAt.getTime()).toBeLessThanOrEqual((now + (60000 * 15)) + 60000)
    expect(holdToken.expiresAt.getTime()).toBeGreaterThanOrEqual(now - 60000)
    expect(holdToken.holdToken).toBeTruthy()
})

test('should create hold token that expires in 1 minute', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const holdToken = await client.holdTokens.create(1)

    expect(holdToken.expiresAt instanceof Date).toBe(true)
    expect(holdToken.holdToken).toBeTruthy()
    expect(holdToken.expiresInSeconds).toBeLessThanOrEqual(60)
})
