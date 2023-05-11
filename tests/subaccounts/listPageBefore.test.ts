// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list subaccounts before given subaccount id', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()

    const page = await client.subaccounts.listPageBefore(subaccount1.id)

    const subaccountKeys = [page.items[0].id, page.items[1].id]
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subaccountKeys.sort()).toEqual([subaccount3.id, subaccount2.id].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list subaccounts before given subaccount id with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    await client.subaccounts.create()

    const page = await client.subaccounts.listPageBefore(subaccount1.id, null, 1)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items[0].id).toEqual(subaccount2.id)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items.length).toBe(1)
})
