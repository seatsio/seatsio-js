import { TestUtils } from '../testUtils'

test('should regenerate the designer key', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const newDesignerKey = await client.accounts.regenerateDesignerKey()

    expect(newDesignerKey).not.toBeFalsy()
    expect(newDesignerKey).not.toBe(user.designerKey)
    const account = await client.accounts.retrieveMyAccount()
    expect(newDesignerKey).toBe(account.designerKey)
})
