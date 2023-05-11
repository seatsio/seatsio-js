// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should retrieve my account', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const myAccount = await client.accounts.retrieveMyAccount()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.secretKey).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.designerKey).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.email).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.company).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.settings.holdPeriodInMinutes).toBe(15)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.settings.draftChartDrawingsEnabled).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.settings.holdOnSelectForGAs).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.settings.chartValidation.VALIDATE_DUPLICATE_LABELS).toBe('OFF')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.settings.chartValidation.VALIDATE_OBJECTS_WITHOUT_CATEGORIES).toBe('OFF')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.settings.chartValidation.VALIDATE_UNLABELED_OBJECTS).toBe('OFF')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.settings.chartValidation.VALIDATE_FOCAL_POINT).toBe('OFF')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.settings.chartValidation.VALIDATE_OBJECT_TYPES_PER_CATEGORY).toBe('OFF')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.settings.chartValidation.VALIDATE_EMPTY_FLOOR).toBe('OFF')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.settings.defaultRendererSettings.showFullScreenButton).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(myAccount.settings.defaultRendererSettings.multiSelectEnabled).toBe(false)
})
