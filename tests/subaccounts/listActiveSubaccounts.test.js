const testUtils = require('../testUtils.js')

test('should list all active subaccounts', async () => {
    const { client, subaccount } = await testUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()
    await client.subaccounts.deactivate(subaccount3.id)
    const activeSubaccountIds = []

    for await (const subaccount of client.subaccounts.active.all()) {
        activeSubaccountIds.push(subaccount.id)
    }

    expect(activeSubaccountIds.sort()).toEqual([subaccount2.id, subaccount1.id, subaccount.id].sort())
})

test('should list first page of active subaccounts', async () => {
    const { client, subaccount } = await testUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()

    const firstPage = await client.subaccounts.active.firstPage()

    expect(firstPage.items.map(item => item.id).sort()).toEqual([subaccount1.id, subaccount2.id, subaccount3.id, subaccount.id].sort())
    expect(firstPage.items.length).toBe(4)
})

test('should list first page of active subaccounts with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    await client.subaccounts.create()
    await client.subaccounts.create()
    const subaccount = await client.subaccounts.create()

    const firstPage = await client.subaccounts.active.firstPage(null, 1)

    expect(firstPage.items[0].id).toEqual(subaccount.id)
    expect(firstPage.items.length).toBe(1)
})

test('should list page after of active subaccounts', async () => {
    const { client, subaccount } = await testUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()

    const pageAfter = await client.subaccounts.active.pageAfter(subaccount3.id)

    expect([pageAfter.items[0].id, pageAfter.items[1].id, pageAfter.items[2].id].sort()).toEqual([subaccount1.id, subaccount2.id, subaccount.id].sort())
    expect(pageAfter.items.length).toBe(3)
})

test('should list page after of active subaccounts with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()

    const pageAfter = await client.subaccounts.active.pageAfter(subaccount3.id, null, 1)

    expect(pageAfter.items[0].id).toEqual(subaccount2.id)
    expect(pageAfter.items.length).toBe(1)
})

test('should list page before of active subaccounts', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()

    const pageAfter = await client.subaccounts.active.pageBefore(subaccount1.id)

    expect([pageAfter.items[0].id, pageAfter.items[1].id].sort()).toEqual([subaccount2.id, subaccount3.id].sort())
    expect(pageAfter.items.length).toBe(2)
})

test('should list page before of active subaccounts with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    await client.subaccounts.create()

    const pageAfter = await client.subaccounts.active.pageBefore(subaccount1.id, null, 1)

    expect(pageAfter.items[0].id).toEqual(subaccount2.id)
    expect(pageAfter.items.length).toBe(1)
})
