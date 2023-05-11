// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

test('should regenerate designer key', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()

    const newDesignerKey = await client.subaccounts.regenerateDesignerKey(subaccount.id)

    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(newDesignerKey.designerKey).toBeTruthy()
    expect(retrievedSubaccount.designerKey).toBe(newDesignerKey.designerKey)
})
