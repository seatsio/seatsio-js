// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

test('should retrieve subaccount', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create('joske')

    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)

    expect(retrievedSubaccount.id).toBe(subaccount.id)
    expect(retrievedSubaccount.secretKey).toBeTruthy()
    expect(retrievedSubaccount.designerKey).toBeTruthy()
    expect(retrievedSubaccount.publicKey).toBeTruthy()
    expect(retrievedSubaccount.name).toBe('joske')
    expect(retrievedSubaccount.active).toBe(true)
})
