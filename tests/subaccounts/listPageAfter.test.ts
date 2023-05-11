// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list subaccounts after given subaccount id', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()

    const page = await client.subaccounts.listPageAfter(subaccount3.id)

    const subaccountKeys = [page.items[0].secretKey, page.items[1].secretKey]
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subaccountKeys.sort()).toEqual([subaccount1.secretKey, subaccount2.secretKey].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list subaccounts after given subaccount id with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()

    const page = await client.subaccounts.listPageAfter(subaccount3.id, null, 1)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items[0].id).toEqual(subaccount2.id)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items.length).toBe(1)
})
