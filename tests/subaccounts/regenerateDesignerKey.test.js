const testUtils = require('../testUtils.js')

test('should regenerate designer key', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()

    const newDesignerKey = await client.subaccounts.regenerateDesignerKey(subaccount.id)

    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(newDesignerKey.designerKey).toBeTruthy()
    expect(retrievedSubaccount.designerKey).toBe(newDesignerKey.designerKey)
})
