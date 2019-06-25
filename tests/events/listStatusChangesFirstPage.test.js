const testUtils = require('../testUtils.js')
const StatusChangesParams = require('../../src/Events/StatusChangesParams.js')

test('should list status changes in the first page', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')

    let firstPage = await client.events.statusChanges(event.key).firstPage()

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel
    ]
    expect(labels).toEqual(['A-3', 'A-2', 'A-1'])
    expect(firstPage.items.length).toBe(3)
    expect(firstPage.nextPageStartsAfter).toBe(null)
    expect(firstPage.previousPageEndsBefore).toBe(null)
})

test('should list status changes in the first page with page size', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')

    let firstPage = await client.events.statusChanges(event.key).firstPage(null, 1)

    expect(firstPage.items[0].objectLabel).toBe('A-2')
    expect(firstPage.items.length).toBe(1)
    expect(firstPage.nextPageStartsAfter).toBe(firstPage.items[0].id + '')
    expect(firstPage.previousPageEndsBefore).toBe(null)
})
test('should list status changes in the first page sorted by descending', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')

    let params = new StatusChangesParams().sortDescending()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel
    ]
    expect(labels).toEqual(['A-3', 'A-2', 'A-1'])
    expect(firstPage.items.length).toBe(3)
    expect(firstPage.nextPageStartsAfter).toBe(null)
    expect(firstPage.previousPageEndsBefore).toBe(null)
})

test('should list status changes in the first page sorted by ascending', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')

    let params = new StatusChangesParams().sortAscending()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel
    ]
    expect(labels).toEqual(['A-1', 'A-2', 'A-3'])
    expect(firstPage.items.length).toBe(3)
    expect(firstPage.nextPageStartsAfter).toBe(null)
    expect(firstPage.previousPageEndsBefore).toBe(null)
})

test('should list status changes in the first page sorted by label', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')

    let params = new StatusChangesParams().sortByObjectLabel()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel
    ]
    expect(labels).toEqual(['A-1', 'A-2', 'A-3'])
    expect(firstPage.items.length).toBe(3)
    expect(firstPage.nextPageStartsAfter).toBe(null)
    expect(firstPage.previousPageEndsBefore).toBe(null)
})

test('should list status changes in the first page sorted by label descending', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')

    let params = new StatusChangesParams().sortByObjectLabel().sortDescending()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel
    ]
    expect(labels).toEqual(['A-3', 'A-2', 'A-1'])
    expect(firstPage.items.length).toBe(3)
    expect(firstPage.nextPageStartsAfter).toBe(null)
    expect(firstPage.previousPageEndsBefore).toBe(null)
})

test('should list status changes in the first page sorted by label with page size', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')

    let params = new StatusChangesParams().sortByObjectLabel()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params, 1)

    expect(firstPage.items[0].objectLabel).toEqual('A-1')
    expect(firstPage.items.length).toBe(1)
    expect(firstPage.nextPageStartsAfter).toBe(firstPage.items[0].id + '')
    expect(firstPage.previousPageEndsBefore).toBe(null)
})

test('should list status changes in the first page sorted by status', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    let holdToken = await client.holdTokens.create()
    await client.events.book(event.key, 'A-1')
    await client.events.hold(event.key, 'A-2', holdToken.holdToken)
    await client.events.release(event.key, 'A-2', holdToken.holdToken)
    await client.events.book(event.key, 'A-3')

    let params = new StatusChangesParams().sortByStatus()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel,
        firstPage.items[3].objectLabel
    ]
    expect(labels).toEqual(['A-3', 'A-1', 'A-2', 'A-2'])
    expect(firstPage.items[0].status).toBe('booked')
    expect(firstPage.items[1].status).toBe('booked')
    expect(firstPage.items[2].status).toBe('free')
    expect(firstPage.items[3].status).toBe('reservedByToken')
    expect(firstPage.items.length).toBe(4)
    expect(firstPage.nextPageStartsAfter).toBe(null)
    expect(firstPage.previousPageEndsBefore).toBe(null)
})

test('should list status changes in the first page sorted by status descending', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    let holdToken = await client.holdTokens.create()
    await client.events.book(event.key, 'A-1')
    await client.events.hold(event.key, 'A-2', holdToken.holdToken)
    await client.events.release(event.key, 'A-2', holdToken.holdToken)
    await client.events.book(event.key, 'A-3')

    let params = new StatusChangesParams().sortByStatus().sortDescending()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel,
        firstPage.items[3].objectLabel
    ]
    expect(labels).toEqual(['A-2', 'A-2', 'A-3', 'A-1'])
    expect(firstPage.items[3].status).toBe('booked')
    expect(firstPage.items[2].status).toBe('booked')
    expect(firstPage.items[1].status).toBe('free')
    expect(firstPage.items[0].status).toBe('reservedByToken')
    expect(firstPage.items.length).toBe(4)
    expect(firstPage.nextPageStartsAfter).toBe(null)
    expect(firstPage.previousPageEndsBefore).toBe(null)
})

test('should list status changes in the first page sorted by status with page size', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    let holdToken = await client.holdTokens.create()
    await client.events.book(event.key, 'A-1')
    await client.events.hold(event.key, 'A-2', holdToken.holdToken)
    await client.events.release(event.key, 'A-2', holdToken.holdToken)
    await client.events.book(event.key, 'A-3')

    let params = new StatusChangesParams().sortByStatus()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params, 2)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel
    ]
    expect(labels).toEqual(['A-3', 'A-1'])
    expect(firstPage.items[0].status).toBe('booked')
    expect(firstPage.items[1].status).toBe('booked')
    expect(firstPage.items.length).toBe(2)
    expect(firstPage.nextPageStartsAfter).toBe(firstPage.items[1].id + '')
    expect(firstPage.previousPageEndsBefore).toBe(null)
})

test('should list status changes in the first page sorted by date ascending', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    let holdToken = await client.holdTokens.create()
    await client.events.book(event.key, 'A-1')
    await client.events.hold(event.key, 'A-2', holdToken.holdToken)
    await client.events.release(event.key, 'A-2', holdToken.holdToken)
    await client.events.book(event.key, 'A-3')

    let params = new StatusChangesParams().sortAscending()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel,
        firstPage.items[3].objectLabel
    ]
    expect(labels).toEqual(['A-1', 'A-2', 'A-2', 'A-3'])
    expect(firstPage.items.length).toBe(4)
    expect(firstPage.nextPageStartsAfter).toBe(null)
    expect(firstPage.previousPageEndsBefore).toBe(null)
})

test('should list status changes in the first page sorted by date ascending with page size', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    let holdToken = await client.holdTokens.create()
    await client.events.book(event.key, 'A-1')
    await client.events.hold(event.key, 'A-2', holdToken.holdToken)
    await client.events.release(event.key, 'A-2', holdToken.holdToken)
    await client.events.book(event.key, 'A-3')

    let params = new StatusChangesParams().sortAscending()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params, 2)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel
    ]
    expect(labels).toEqual(['A-1', 'A-2'])
    expect(firstPage.items.length).toBe(2)
    expect(firstPage.nextPageStartsAfter).toBe(firstPage.items[1].id + '')
    expect(firstPage.previousPageEndsBefore).toBe(null)
})

test('should list status changes in the first page with filter', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    let holdToken = await client.holdTokens.create()
    await client.events.book(event.key, 'A-1')
    await client.events.hold(event.key, 'A-2', holdToken.holdToken)
    await client.events.release(event.key, 'A-2', holdToken.holdToken)
    await client.events.book(event.key, 'A-3')
    await client.events.book(event.key, 'B-2')

    let params = new StatusChangesParams().withFilter('2')
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel
    ]
    expect(labels).toEqual(['B-2', 'A-2', 'A-2'])
    expect(firstPage.items.length).toBe(3)
    expect(firstPage.nextPageStartsAfter).toBe(null)
    expect(firstPage.previousPageEndsBefore).toBe(null)
})

test('should list status changes in the first page with filter and page size', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')

    let params = new StatusChangesParams().withFilter('A')
    let firstPage = await client.events.statusChanges(event.key).firstPage(params, 1)

    let labels = [
        firstPage.items[0].objectLabel
    ]
    expect(labels).toEqual(['A-3'])
    expect(firstPage.items.length).toBe(1)
    expect(firstPage.nextPageStartsAfter).toBe(firstPage.items[0].id + '')
    expect(firstPage.previousPageEndsBefore).toBe(null)
})

test('should not list status changes in the first page with unmatched filter', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-2')

    let params = new StatusChangesParams().withFilter('B')
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    expect(firstPage.items).toEqual([])
})

test('list status changes filtered and sorted by label', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'C-1')
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'B-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')

    let params = new StatusChangesParams().withFilter('1').sortByObjectLabel()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel
    ]
    expect(labels).toEqual(['A-1', 'B-1', 'C-1'])
    expect(firstPage.items.length).toEqual(3)
})

test('list status changes filtered and sorted by date ascending', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'B-1')
    await client.events.book(event.key, 'A-2')
    await client.events.book(event.key, 'A-3')
    await client.events.book(event.key, 'C-1')

    let params = new StatusChangesParams().withFilter('1').sortAscending()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel
    ]
    expect(labels).toEqual(['B-1', 'C-1'])
    expect(firstPage.items.length).toEqual(2)
})

test('list status changes filtered and sorted by status', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    let holdToken = await client.holdTokens.create()
    await client.events.book(event.key, 'A-1')
    await client.events.hold(event.key, 'C-1', holdToken.holdToken)
    await client.events.hold(event.key, 'B-1', holdToken.holdToken)
    await client.events.release(event.key, 'C-1', holdToken.holdToken)

    let params = new StatusChangesParams().withFilter('1').sortByStatus()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel,
        firstPage.items[3].objectLabel
    ]
    expect(labels).toEqual(['A-1', 'C-1', 'B-1', 'C-1'])
    expect(firstPage.items.length).toEqual(4)
})

test('list status changes based on latest parameter passed (and filter), chained', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'B-1')
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-3')
    await client.events.book(event.key, 'A-2')

    let params = new StatusChangesParams().sortAscending().withFilter('1').sortByObjectLabel()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel
    ]
    expect(labels).toEqual(['A-1', 'B-1'])
    expect(firstPage.items.length).toBe(2)
})

test("that parameter order doesn't matter for filtering and latest sortBy is taken into account", async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'B-1')
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-3')
    await client.events.book(event.key, 'A-2')

    let params = new StatusChangesParams().sortAscending().sortByObjectLabel().withFilter('1')
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel
    ]
    expect(labels).toEqual(['A-1', 'B-1'])
    expect(firstPage.items.length).toBe(2)
})

test('that combined sorting parameter still work, sorts based on the latest', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'B-1')
    await client.events.book(event.key, 'A-1')
    await client.events.book(event.key, 'A-3')
    await client.events.book(event.key, 'A-2')

    let params = new StatusChangesParams().sortByDate().sortDescending().sortByObjectLabel().sortAscending()
    let firstPage = await client.events.statusChanges(event.key).firstPage(params)

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel,
        firstPage.items[3].objectLabel
    ]
    expect(labels).toEqual(['A-1', 'A-2', 'A-3', 'B-1'])
    expect(firstPage.items.length).toBe(4)
})
