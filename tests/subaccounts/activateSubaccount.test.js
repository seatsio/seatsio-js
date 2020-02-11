const testUtils = require('../testUtils.js')

test('should activate subaccount', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()
    await client.subaccounts.deactivate(subaccount.id)

    await client.subaccounts.activate(subaccount.id)

    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(retrievedSubaccount.active).toBe(true)
})
