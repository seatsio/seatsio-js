const testUtils = require('../testUtils.js')

test('should deactivate subaccount', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()
    await client.subaccounts.deactivate(subaccount.id)
    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)

    expect(retrievedSubaccount.active).toBe(false)
})
