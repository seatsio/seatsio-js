// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('listAll subaccounts when there are more than 10 subaccounts', async () => {
    const { client, subaccount } = await TestUtils.createTestUserAndClient()
    const subaccounts = await TestUtils.createArray(15, () => client.subaccounts.create())

    const retrievedSubaccountIds = []
    for await (const subaccount of client.subaccounts.listAll()) {
        retrievedSubaccountIds.push(subaccount.id)
    }

    const subaccountIDs = subaccounts.map(s => s.id).concat(subaccount.id)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSubaccountIds.sort()).toEqual(subaccountIDs.sort())
})
