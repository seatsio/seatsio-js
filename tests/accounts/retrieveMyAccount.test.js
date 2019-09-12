test('should retrieve my account', async () => {
    let myAccount = await client.accounts.retrieveMyAccount()

    expect(myAccount.secretKey).toBeTruthy()
    expect(myAccount.designerKey).toBeTruthy()
    expect(myAccount.publicKey).toBeTruthy()
    expect(myAccount.email).toBeTruthy()
    expect(myAccount.isSubaccount).toBe(false)
    expect(myAccount.betaFeatures).toBe(false)
    expect(myAccount.company).toBe({
        hasChosenSubscriptionPlan: false,
        id: 5974,
        name: "87da546e-2411-42b1-9aab-6b3f4a873e33@mailinator.com"
    })
    expect(myAccount.settings.holdPeriodInMinutes).toBe(15)
    expect(myAccount.settings.draftChartDrawingsEnabled).toBe(true)
    expect(myAccount.settings.holdOnSelectForGAs).toBe(true)
    expect(myAccount.settings.chartValidation.VALIDATE_DUPLICATE_LABELS).toBe('ERROR')
    expect(myAccount.settings.chartValidation.VALIDATE_OBJECTS_WITHOUT_CATEGORIES).toBe('ERROR')
    expect(myAccount.settings.chartValidation.VALIDATE_UNLABELED_OBJECTS).toBe('ERROR')
    expect(myAccount.settings.chartValidation.VALIDATE_FOCAL_POINT).toBe('OFF')
    expect(myAccount.settings.chartValidation.VALIDATE_OBJECT_TYPES_PER_CATEGORY).toBe('OFF')
    expect(myAccount.settings.chartValidation.VALIDATE_EMPTY_FLOOR).toBe('ERROR')
})