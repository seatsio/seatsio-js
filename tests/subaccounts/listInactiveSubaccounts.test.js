const testUtils = require('../testUtils.js')

test('should list all inactive subaccounts', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.create(),
        client.subaccounts.deactivate(subaccount1.id),
        client.subaccounts.deactivate(subaccount2.id)
    ]
    await Promise.all(promises)
    const inactiveSubaccountIds = []

    for await (const subaccount of client.subaccounts.inactive.all()) {
        inactiveSubaccountIds.push(subaccount.id)
    }

    expect(inactiveSubaccountIds.sort()).toEqual([subaccount1.id, subaccount2.id].sort())
})

test('should list first page of inactive subaccounts', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.create(),
        client.subaccounts.deactivate(subaccount1.id),
        client.subaccounts.deactivate(subaccount2.id),
        client.subaccounts.deactivate(subaccount3.id)
    ]
    await Promise.all(promises)

    const firstPage = await client.subaccounts.inactive.firstPage()

    expect(firstPage.items.map(item => item.id).sort()).toEqual([subaccount1.id, subaccount2.id, subaccount3.id].sort())
    expect(firstPage.items.length).toBe(3)
})

test('should list first page of inactive subaccounts with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.create(),
        client.subaccounts.deactivate(subaccount1.id),
        client.subaccounts.deactivate(subaccount2.id),
        client.subaccounts.deactivate(subaccount3.id)
    ]
    await Promise.all(promises)
    const firstPage = await client.subaccounts.inactive.firstPage(null, 2)

    expect(firstPage.items.map(item => item.id).sort()).toEqual([subaccount2.id, subaccount3.id].sort())
})

test('should list page after of inactive subaccounts', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.deactivate(subaccount1.id),
        client.subaccounts.deactivate(subaccount2.id),
        client.subaccounts.deactivate(subaccount3.id)
    ]
    await Promise.all(promises)
    const pageAfter = await client.subaccounts.inactive.pageAfter(subaccount3.id)

    expect([pageAfter.items[0].id, pageAfter.items[1].id].sort()).toEqual([subaccount1.id, subaccount2.id].sort())
})

test('should list page after of inactive subaccounts with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.deactivate(subaccount2.id),
        client.subaccounts.deactivate(subaccount3.id)
    ]
    await Promise.all(promises)
    const pageAfter = await client.subaccounts.inactive.pageAfter(subaccount3.id, null, 1)

    expect(pageAfter.items[0].id).toEqual(subaccount2.id)
})

test('should list page before of inactive subaccounts', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const subaccount3 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.deactivate(subaccount1.id),
        client.subaccounts.deactivate(subaccount2.id),
        client.subaccounts.deactivate(subaccount3.id)
    ]
    await Promise.all(promises)
    const pageAfter = await client.subaccounts.inactive.pageBefore(subaccount1.id)

    expect([pageAfter.items[0].id, pageAfter.items[1].id].sort()).toEqual([subaccount2.id, subaccount3.id].sort())
})

test('should list page before of inactive subaccounts with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const subaccount1 = await client.subaccounts.create()
    const subaccount2 = await client.subaccounts.create()
    const promises = [
        client.subaccounts.create(),
        client.subaccounts.deactivate(subaccount1.id),
        client.subaccounts.deactivate(subaccount2.id)
    ]
    await Promise.all(promises)
    const pageAfter = await client.subaccounts.inactive.pageBefore(subaccount1.id, null, 1)

    expect(pageAfter.items[0].id).toEqual(subaccount2.id)
})
