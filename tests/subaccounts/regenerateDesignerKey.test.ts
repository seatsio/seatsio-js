import { TestUtils } from '../testUtils'

test('should regenerate designer key', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()

    const newDesignerKey = await client.subaccounts.regenerateDesignerKey(subaccount.id)

    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(newDesignerKey.designerKey).toBeTruthy()
    expect(retrievedSubaccount.designerKey).toBe(newDesignerKey.designerKey)
})
