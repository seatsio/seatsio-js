import { TestUtils } from '../testUtils'

test('should retrieve my account', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const myAccount = await client.accounts.retrieveMyAccount()

    expect(myAccount.secretKey).toBeTruthy()
    expect(myAccount.designerKey).toBeTruthy()
    expect(myAccount.email).toBeTruthy()
    expect(myAccount.company).toBeTruthy()
    expect(myAccount.settings.holdPeriodInMinutes).toBe(15)
    expect(myAccount.settings.draftChartDrawingsEnabled).toBe(true)
    expect(myAccount.settings.holdOnSelectForGAs).toBe(true)
    expect(myAccount.settings.chartValidation.VALIDATE_DUPLICATE_LABELS).toBe('OFF')
    expect(myAccount.settings.chartValidation.VALIDATE_OBJECTS_WITHOUT_CATEGORIES).toBe('OFF')
    expect(myAccount.settings.chartValidation.VALIDATE_UNLABELED_OBJECTS).toBe('OFF')
    expect(myAccount.settings.chartValidation.VALIDATE_FOCAL_POINT).toBe('OFF')
    expect(myAccount.settings.chartValidation.VALIDATE_OBJECT_TYPES_PER_CATEGORY).toBe('OFF')
    expect(myAccount.settings.chartValidation.VALIDATE_EMPTY_FLOOR).toBe('OFF')
    expect(myAccount.settings.defaultRendererSettings.showFullScreenButton).toBe(true)
    expect(myAccount.settings.defaultRendererSettings.multiSelectEnabled).toBe(false)
})
