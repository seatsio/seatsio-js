const testUtils = require('../testUtils.js');

test('should retrieve hold tokens', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var holdToken = await client.holdTokens.create();
    var retrievedToken = await client.holdTokens.retrieve(holdToken.holdToken);
    expect(retrievedToken.holdToken).toBe(holdToken.holdToken);
    expect(retrievedToken.expiresAt).toBe(holdToken.expiresAt);
    expect(holdToken.expiresInSeconds).toBeGreaterThanOrEqual(14 * 60);
    expect(holdToken.expiresInSeconds).toBeLessThanOrEqual(15 * 60);
});
