const testUtils = require('../testUtils.js')

test('should list subaccounts before given subaccount id', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()

    const page = await client.subaccounts.listPageBefore(subaccount1.id)

    const subaccountKeys = [page.items[0].id, page.items[1].id]
    expect(subaccountKeys.sort()).toEqual([subaccount3.id, subaccount2.id].sort())
})

test('should list subaccounts before given subaccount id with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    await client.subaccounts.create()

    const page = await client.subaccounts.listPageBefore(subaccount1.id, null, 1)

    expect(page.items[0].id).toEqual(subaccount2.id)
    expect(page.items.length).toBe(1)
})
