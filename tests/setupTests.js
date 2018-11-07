const testUtils = require('./testUtils.js');

beforeEach(async () => {
    global.user = await testUtils.createTestUser();
    global.client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
});

