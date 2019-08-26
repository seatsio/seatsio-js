const testUtils = require('./testUtils')

beforeEach(async () => {
    jest.setTimeout(30000)
    global.user = await testUtils.createTestUser()
    global.client = testUtils.createClient(user.secretKey)
})
