import { TestUtils } from '../testUtils'

test('should activate subaccount', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()
    await client.subaccounts.deactivate(subaccount.id)

    await client.subaccounts.activate(subaccount.id)

    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(retrievedSubaccount.active).toBe(true)
})
