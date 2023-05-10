import { TestUtils } from '../testUtils'

test('should deactivate subaccount', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()
    await client.subaccounts.deactivate(subaccount.id)
    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)

    expect(retrievedSubaccount.active).toBe(false)
})
