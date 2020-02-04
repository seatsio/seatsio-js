test('should list all active subaccounts', async () => {
    let promises = [
        client.subaccounts.create(),
        client.subaccounts.create(),
        client.subaccounts.create()
    ]
    let subaccounts = await Promise.all(promises)
    await client.subaccounts.deactivate(subaccounts[2].id)
    let activeSubaccountIds = []

    for await (let subaccount of client.subaccounts.active.all()) {
        activeSubaccountIds.push(subaccount.id)
    }

    expect(activeSubaccountIds.sort()).toEqual([subaccounts[0].id, subaccounts[1].id, user.mainWorkspace.primaryUser.id].sort())
})

test('should list first page of active subaccounts', async () => {
    let promises = [
        client.subaccounts.create(),
        client.subaccounts.create(),
        client.subaccounts.create()
    ]
    let subaccounts = await Promise.all(promises)

    let firstPage = await client.subaccounts.active.firstPage()

    expect(firstPage.items.map(item => item.id).sort()).toEqual([subaccounts[0].id, subaccounts[1].id, subaccounts[2].id, user.mainWorkspace.primaryUser.id].sort())
    expect(firstPage.items.length).toBe(4)
})

test('should list first page of active subaccounts with page size', async () => {
    await client.subaccounts.create()
    await client.subaccounts.create()
    let subaccount = await client.subaccounts.create()

    let firstPage = await client.subaccounts.active.firstPage(null, 1)

    expect(firstPage.items[0].id).toEqual(subaccount.id)
    expect(firstPage.items.length).toBe(1)
})

test('should list page after of active subaccounts', async () => {
    let promises = [
        client.subaccounts.create(),
        client.subaccounts.create()
    ]
    let subaccounts = await Promise.all(promises)
    let latestSubaccount = await client.subaccounts.create()

    let pageAfter = await client.subaccounts.active.pageAfter(latestSubaccount.id)

    expect([pageAfter.items[0].id, pageAfter.items[1].id, pageAfter.items[2].id].sort()).toEqual([subaccounts[0].id, subaccounts[1].id, user.mainWorkspace.primaryUser.id].sort())
    expect(pageAfter.items.length).toBe(3)
})

test('should list page after of active subaccounts with page size', async () => {
    await client.subaccounts.create()
    let subaccount2 = await client.subaccounts.create()
    let subaccount3 = await client.subaccounts.create()

    let pageAfter = await client.subaccounts.active.pageAfter(subaccount3.id, null, 1)

    expect(pageAfter.items[0].id).toEqual(subaccount2.id)
    expect(pageAfter.items.length).toBe(1)
})

test('should list page before of active subaccounts', async () => {
    let subaccount1 = await client.subaccounts.create()
    let promises = [
        client.subaccounts.create(),
        client.subaccounts.create()
    ]
    let subaccounts = await Promise.all(promises)

    let pageAfter = await client.subaccounts.active.pageBefore(subaccount1.id)

    expect([pageAfter.items[0].id, pageAfter.items[1].id].sort()).toEqual([subaccounts[0].id, subaccounts[1].id].sort())
    expect(pageAfter.items.length).toBe(2)
})

test('should list page before of active subaccounts with page size', async () => {
    let subaccount1 = await client.subaccounts.create()
    let subaccount2 = await client.subaccounts.create()
    await client.subaccounts.create()

    let pageAfter = await client.subaccounts.active.pageBefore(subaccount1.id, null, 1)

    expect(pageAfter.items[0].id).toEqual(subaccount2.id)
    expect(pageAfter.items.length).toBe(1)
})
