test('should retrieve subaccount', async () => {
    let subaccount = await client.subaccounts.create('joske')

    let retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)

    expect(retrievedSubaccount.id).toBe(subaccount.id)
    expect(retrievedSubaccount.secretKey).toBeTruthy()
    expect(retrievedSubaccount.designerKey).toBeTruthy()
    expect(retrievedSubaccount.publicKey).toBeTruthy()
    expect(retrievedSubaccount.name).toBe('joske')
    expect(retrievedSubaccount.active).toBe(true)
})
