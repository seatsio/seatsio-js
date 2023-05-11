// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should disable draft chart drawings', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    await client.accounts.enableDraftChartDrawings()

    await client.accounts.disableDraftChartDrawings()

    const account = await client.accounts.retrieveMyAccount()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(account.settings.draftChartDrawingsEnabled).toBe(false)
})
