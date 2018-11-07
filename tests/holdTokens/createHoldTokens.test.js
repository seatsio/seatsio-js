const testUtils = require('../testUtils.js');

test('should create hold tokens', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var holdToken = await client.holdTokens.create();
    expect(holdToken.holdToken).toBeDefined();
});
