const testUtils = require('../testUtils.js')

test('should regenerate the designer key', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const newDesignerKey = await client.accounts.regenerateDesignerKey()

    expect(newDesignerKey).not.toBeFalsy()
    expect(newDesignerKey).not.toBe(user.designerKey)
    const account = await client.accounts.retrieveMyAccount()
    expect(newDesignerKey).toBe(account.designerKey)
})
