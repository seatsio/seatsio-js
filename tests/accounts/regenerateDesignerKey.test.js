test('should regenerate the designer key', async () => {
    let newDesignerKey = await client.accounts.regenerateDesignerKey()

    expect(newDesignerKey).not.toBeFalsy()
    expect(newDesignerKey).not.toBe(user.designerKey)
    let account = await client.accounts.retrieveMyAccount()
    expect(newDesignerKey).toBe(account.designerKey)
})
