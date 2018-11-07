const testUtils = require('../testUtils.js');

test('should update hold token expiration date', async () => {
    var d = new Date().toISOString();
    var lowerBound = new Date(d);
    var upperBound = new Date(d);
    lowerBound.setMinutes(lowerBound.getMinutes() + 30);
    upperBound.setMinutes(upperBound.getMinutes() + 31);
    var holdToken = await client.holdTokens.create();
    var updatedHoldToken = await client.holdTokens.expiresInMinutes(holdToken.holdToken, 30);
    var retrievedExpiresAt = new Date(updatedHoldToken.expiresAt);

    expect(updatedHoldToken.holdToken).toBe(holdToken.holdToken);
    expect(lowerBound.getTime() <= retrievedExpiresAt.getTime()).toBe(true);
    expect(retrievedExpiresAt.getTime() <= upperBound.getTime()).toBe(true);
    expect(updatedHoldToken.expiresInSeconds).toBeGreaterThanOrEqual(29 * 60);
    expect(updatedHoldToken.expiresInSeconds).toBeLessThanOrEqual(30 * 60);

});
