test('should regenerate designer key', async () => {
    let subaccount = await client.subaccounts.create()

    let newDesignerKey = await client.subaccounts.regenerateDesignerKey(subaccount.id)

    let retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(newDesignerKey.designerKey).toBeTruthy()
    expect(retrievedSubaccount.designerKey).toBe(newDesignerKey.designerKey)
})
