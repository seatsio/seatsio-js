const testUtils = require('../testUtils.js');

test('should retrieve hold tokens', async () => {
    var holdToken = await client.holdTokens.create();
    var retrievedToken = await client.holdTokens.retrieve(holdToken.holdToken);
    expect(retrievedToken.holdToken).toBe(holdToken.holdToken);
    expect(retrievedToken.expiresAt).toBe(holdToken.expiresAt);
    expect(holdToken.expiresInSeconds).toBeGreaterThanOrEqual(14 * 60);
    expect(holdToken.expiresInSeconds).toBeLessThanOrEqual(15 * 60);
});
