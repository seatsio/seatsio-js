test('should activate subaccount', async () => {
    let subaccount = await client.subaccounts.create()
    await client.subaccounts.deactivate(subaccount.id)

    await client.subaccounts.activate(subaccount.id)

    let retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(retrievedSubaccount.active).toBe(true)
})
