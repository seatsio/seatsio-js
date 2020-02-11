const testUtils = require('../testUtils.js')
const StatusChangesParams = require('../../src/Events/StatusChangesParams.js')

test('should list status changes before given id', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const pageBefore = await client.events.statusChanges(event.key).pageBefore(firstPage.items[2].id)

    expect([pageBefore.items[0].objectLabel, pageBefore.items[1].objectLabel]).toEqual(['A-3', 'A-2'])
    expect(pageBefore.items.length).toBe(2)
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[1].id + '')
    expect(pageBefore.previousPageEndsBefore).toBe(null)
})

test('should list status changes before given id with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const pageBefore = await client.events.statusChanges(event.key).pageBefore(firstPage.items[2].id, null, 1)

    expect(pageBefore.items[0].objectLabel).toEqual('A-2')
    expect(pageBefore.items.length).toBe(1)
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[0].id + '')
    expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '')
})

test('should list status changes before given id sorted by label', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().sortByObjectLabel()
    const pageBefore = await client.events.statusChanges(event.key).pageBefore(firstPage.items[0].id, params)

    const labels = [
        pageBefore.items[0].objectLabel,
        pageBefore.items[1].objectLabel
    ]
    expect(labels).toEqual(['A-1', 'A-2'])
    expect(pageBefore.items.length).toBe(2)
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[1].id + '')
    expect(pageBefore.previousPageEndsBefore).toBe(null)
})

test('should list status changes before given id sorted by label with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().sortByObjectLabel()
    const pageBefore = await client.events.statusChanges(event.key).pageBefore(firstPage.items[0].id, params, 1)

    const labels = [
        pageBefore.items[0].objectLabel
    ]
    expect(labels).toEqual(['A-2'])
    expect(pageBefore.items.length).toBe(1)
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[0].id + '')
    expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '')
})

test('should list status changes before given id sorted by status', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'A-2', holdToken.holdToken)
    await client.events.book(event.key, 'A-1')
    await client.events.release(event.key, 'A-2', holdToken.holdToken)
    await client.events.hold(event.key, 'A-3', holdToken.holdToken)
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().sortByStatus()
    const pageBefore = await client.events.statusChanges(event.key).pageBefore(firstPage.items[3].id, params)

    const labels = [
        pageBefore.items[0].objectLabel,
        pageBefore.items[1].objectLabel,
        pageBefore.items[2].objectLabel
    ]
    expect(labels).toEqual(['A-1', 'A-2', 'A-3'])
    expect(pageBefore.items.length).toBe(3)
    expect(pageBefore.nextPageStartsAfter).toEqual(pageBefore.items[2].id + '')
    expect(pageBefore.previousPageEndsBefore).toBe(null)
})

test('should list status changes before given id sorted by status with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'A-2', holdToken.holdToken)
    await client.events.book(event.key, 'A-1')
    await client.events.release(event.key, 'A-2', holdToken.holdToken)
    await client.events.hold(event.key, 'A-3', holdToken.holdToken)
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().sortByStatus()
    const pageBefore = await client.events.statusChanges(event.key).pageBefore(firstPage.items[3].id, params, 2)

    const labels = [
        pageBefore.items[0].objectLabel,
        pageBefore.items[1].objectLabel
    ]
    expect(labels).toEqual(['A-2', 'A-3'])
    expect(pageBefore.items.length).toBe(2)
    expect(pageBefore.nextPageStartsAfter).toEqual(pageBefore.items[1].id + '')
    expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '')
})

test('should list status changes before given id sorted by date ascending', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')
    await client.events.book(event.key, 'A-4')
    await client.events.book(event.key, 'A-5')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().sortAscending()
    const pageBefore = await client.events.statusChanges(event.key).pageBefore(firstPage.items[1].id, params)

    const labels = [
        pageBefore.items[0].objectLabel,
        pageBefore.items[1].objectLabel,
        pageBefore.items[2].objectLabel
    ]
    expect(labels).toEqual(['A-1', 'A-2', 'A-3'])
    expect(pageBefore.items.length).toBe(3)
    expect(pageBefore.nextPageStartsAfter).toEqual(pageBefore.items[2].id + '')
    expect(pageBefore.previousPageEndsBefore).toBe(null)
})

test('should list status changes before given id sorted by date ascending with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')
    await client.events.book(event.key, 'A-4')
    await client.events.book(event.key, 'A-5')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().sortAscending()
    const pageBefore = await client.events.statusChanges(event.key).pageBefore(firstPage.items[1].id, params, 2)

    const labels = [
        pageBefore.items[0].objectLabel,
        pageBefore.items[1].objectLabel
    ]
    expect(labels).toEqual(['A-2', 'A-3'])
    expect(pageBefore.items.length).toBe(2)
    expect(pageBefore.nextPageStartsAfter).toEqual(pageBefore.items[1].id + '')
    expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '')
})

test('should list status changes before given id with filter', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'B-2')
    await client.events.book(event.key, 'C-2')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().withFilter('-2')
    const pageBefore = await client.events.statusChanges(event.key).pageBefore(firstPage.items[2].id, params)

    const labels = [
        pageBefore.items[0].objectLabel,
        pageBefore.items[1].objectLabel
    ]
    expect(labels).toEqual(['C-2', 'B-2'])
    expect(pageBefore.items.length).toBe(2)
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[1].id + '')
    expect(pageBefore.previousPageEndsBefore).toBe(null)
})

test('should list status changes before given id with filter and page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'B-2')
    await client.events.book(event.key, 'C-2')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().withFilter('2')
    const pageBefore = await client.events.statusChanges(event.key).pageBefore(firstPage.items[2].id, params, 1)

    const labels = [
        pageBefore.items[0].objectLabel
    ]
    expect(labels).toEqual(['B-2'])
    expect(pageBefore.items.length).toBe(1)
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[0].id + '')
    expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '')
})

test('should not list status changes before given id with unmatched filter', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'B-2')
    await client.events.book(event.key, 'C-2')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().withFilter('1')
    const pageBefore = await client.events.statusChanges(event.key).pageBefore(firstPage.items[2].id, params)

    expect(pageBefore.items).toEqual([])
})
