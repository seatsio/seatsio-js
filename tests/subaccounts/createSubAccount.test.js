test('should create subaccount with name', async () => {
    let subaccount = await client.subaccounts.create('subaccountTest')

    expect(subaccount.secretKey).toBeTruthy()
    expect(subaccount.designerKey).toBeTruthy()
    expect(subaccount.publicKey).toBeTruthy()
    expect(subaccount.name).toBe('subaccountTest')
    expect(subaccount.active).toBe(true)
    expect(subaccount.email).toBeFalsy()
})

test('name is generated in subaccount create', async () => {
    let subaccount = await client.subaccounts.create()

    expect(subaccount.name).toBeTruthy()
    expect(subaccount.email).toBeFalsy()
})
