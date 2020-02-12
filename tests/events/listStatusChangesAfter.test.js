const testUtils = require('../testUtils.js')
const StatusChangesParams = require('../../src/Events/StatusChangesParams.js')

test('should list status changes after given id ', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const pageAfter = await client.events.statusChanges(event.key).pageAfter(firstPage.items[0].id)

    const labels = [
        pageAfter.items[0].objectLabel,
        pageAfter.items[1].objectLabel
    ]
    expect(labels).toEqual(['A-2', 'A-1'])
    expect(pageAfter.items.length).toBe(2)
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
    expect(firstPage.nextPageStartsAfter).toBe(null)
})

test('should list status changes after given id with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const pageAfter = await client.events.statusChanges(event.key).pageAfter(firstPage.items[0].id, null, 1)

    expect(pageAfter.items[0].objectLabel).toEqual('A-2')
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
    expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '')
    expect(pageAfter.items.length).toBe(1)
})

test('should list status changes after given id sorted by label', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().sortByObjectLabel()
    const pageAfter = await client.events.statusChanges(event.key).pageAfter(firstPage.items[2].id, params)

    const labels = [
        pageAfter.items[0].objectLabel,
        pageAfter.items[1].objectLabel
    ]
    expect(labels).toEqual(['A-2', 'A-3'])
    expect(pageAfter.items.length).toBe(2)
    expect(pageAfter.nextPageStartsAfter).toBe(null)
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
})

test('should list status changes after given id sorted by label with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().sortByObjectLabel()
    const pageAfter = await client.events.statusChanges(event.key).pageAfter(firstPage.items[2].id, params, 1)

    const labels = [
        pageAfter.items[0].objectLabel
    ]
    expect(labels).toEqual(['A-2'])
    expect(pageAfter.items.length).toBe(1)
    expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '')
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
})

test('should list status changes after given id sorted by status', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.book(event.key, 'A-1')
    await client.events.hold(event.key, 'A-2', holdToken.holdToken)
    await client.events.hold(event.key, 'B-1', holdToken.holdToken)
    await client.events.release(event.key, 'A-2', holdToken.holdToken)
    await client.events.release(event.key, 'B-1', holdToken.holdToken)
    await client.events.book(event.key, 'A-3')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().sortByStatus()
    const pageAfter = await client.events.statusChanges(event.key).pageAfter(firstPage.items[1].id, params)

    const labels = [
        pageAfter.items[0].objectLabel,
        pageAfter.items[1].objectLabel,
        pageAfter.items[2].objectLabel
    ]
    expect(labels).toEqual(['A-2', 'B-1', 'A-2'])
    expect(pageAfter.items.length).toBe(3)
    expect(pageAfter.nextPageStartsAfter).toBe(null)
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
})

test('should list status changes after given id sorted by status with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.book(event.key, 'A-1')
    await client.events.hold(event.key, 'A-2', holdToken.holdToken)
    await client.events.hold(event.key, 'B-1', holdToken.holdToken)
    await client.events.release(event.key, 'A-2', holdToken.holdToken)
    await client.events.release(event.key, 'B-1', holdToken.holdToken)
    await client.events.book(event.key, 'A-3')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().sortByStatus()
    const pageAfter = await client.events.statusChanges(event.key).pageAfter(firstPage.items[1].id, params, 2)

    const labels = [
        pageAfter.items[0].objectLabel,
        pageAfter.items[1].objectLabel
    ]
    expect(labels).toEqual(['A-2', 'B-1'])
    expect(pageAfter.items.length).toBe(2)
    expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[1].id + '')
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
})

test('should list status changes after given id sorted by date ascending', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')
    await client.events.book(event.key, 'A-4')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().sortAscending()
    const pageAfter = await client.events.statusChanges(event.key).pageAfter(firstPage.items[2].id, params)

    const labels = [
        pageAfter.items[0].objectLabel,
        pageAfter.items[1].objectLabel
    ]
    expect(labels).toEqual(['A-3', 'A-4'])
    expect(pageAfter.items.length).toBe(2)
    expect(pageAfter.nextPageStartsAfter).toBe(null)
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
})

test('should list status changes after given id sorted by date ascending with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')
    await client.events.book(event.key, 'A-4')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().sortAscending()
    const pageAfter = await client.events.statusChanges(event.key).pageAfter(firstPage.items[2].id, params, 1)

    const labels = [
        pageAfter.items[0].objectLabel
    ]
    expect(labels).toEqual(['A-3'])
    expect(pageAfter.items.length).toBe(1)
    expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '')
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
})

test('should list status changes after given id with filter', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.book(event.key, 'A-1')
    await client.events.hold(event.key, 'A-2', holdToken.holdToken)
    await client.events.hold(event.key, 'B-1', holdToken.holdToken)
    await client.events.book(event.key, 'A-3')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().withFilter('1')
    const pageAfter = await client.events.statusChanges(event.key).pageAfter(firstPage.items[0].id, params)

    const labels = [
        pageAfter.items[0].objectLabel,
        pageAfter.items[1].objectLabel
    ]
    expect(labels).toEqual(['B-1', 'A-1'])
    expect(pageAfter.items.length).toBe(2)
    expect(pageAfter.nextPageStartsAfter).toBe(null)
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
})

test('should list status changes after given id with filter and page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.book(event.key, 'A-1')
    await client.events.hold(event.key, 'A-2', holdToken.holdToken)
    await client.events.hold(event.key, 'B-1', holdToken.holdToken)
    await client.events.book(event.key, 'A-3')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().withFilter('1')
    const pageAfter = await client.events.statusChanges(event.key).pageAfter(firstPage.items[0].id, params, 1)

    expect(pageAfter.items[0].objectLabel).toEqual('B-1')
    expect(pageAfter.items.length).toBe(1)
    expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '')
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
})

test('should not list status changes after given id with unmatched filter', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'B-2')
    await client.events.book(event.key, 'C-2')
    const firstPage = await client.events.statusChanges(event.key).firstPage()

    const params = new StatusChangesParams().withFilter('1')
    const pageAfter = await client.events.statusChanges(event.key).pageAfter(firstPage.items[0].id, params)

    expect(pageAfter.items).toEqual([])
})
