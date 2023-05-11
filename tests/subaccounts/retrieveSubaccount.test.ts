// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should retrieve subaccount', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create('joske')

    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSubaccount.id).toBe(subaccount.id)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSubaccount.secretKey).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSubaccount.designerKey).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSubaccount.publicKey).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSubaccount.name).toBe('joske')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSubaccount.active).toBe(true)
})
