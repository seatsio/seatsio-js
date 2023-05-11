// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should create subaccount with name', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create('subaccountTest')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subaccount.secretKey).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subaccount.designerKey).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subaccount.publicKey).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subaccount.name).toBe('subaccountTest')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subaccount.active).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subaccount.email).toBeFalsy()
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('name is generated in subaccount create', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subaccount.name).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subaccount.email).toBeFalsy()
})
