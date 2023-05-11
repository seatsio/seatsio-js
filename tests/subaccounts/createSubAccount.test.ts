// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

test('should create subaccount with name', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create('subaccountTest')

    expect(subaccount.secretKey).toBeTruthy()
    expect(subaccount.designerKey).toBeTruthy()
    expect(subaccount.publicKey).toBeTruthy()
    expect(subaccount.name).toBe('subaccountTest')
    expect(subaccount.active).toBe(true)
    expect(subaccount.email).toBeFalsy()
})

test('name is generated in subaccount create', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create()

    expect(subaccount.name).toBeTruthy()
    expect(subaccount.email).toBeFalsy()
})
