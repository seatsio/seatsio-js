const testUtils = require('../testUtils.js');

test('should create hold tokens', async () => {
    var holdToken = await client.holdTokens.create();
    expect(holdToken.holdToken).toBeDefined();
});
