const testUtils = require('../testUtils.js')
const StatusChangesParams = require('../../src/Events/StatusChangesParams.js')

describe('statusChanges firstPage', () => {
    beforeAll(async () => {
        jest.setTimeout(35000)
        global.testUser = await testUtils.createTestUser()
        global.testClient = testUtils.createClient(testUser.secretKey)

        let chartKey = testUtils.getChartKey()
        await testUtils.createTestChart(chartKey, testUser.secretKey)

        global.event_1 = await testClient.events.create(chartKey)
        await testClient.events.book(event_1.key, 'A-1')
        await testClient.events.book(event_1.key, 'A-2')
        await testClient.events.book(event_1.key, 'A-3')

        global.event_2 = await testClient.events.create(chartKey)
        let holdToken = await testClient.holdTokens.create()
        await testClient.events.book(event_2.key, 'A-1')
        await testClient.events.hold(event_2.key, 'A-2', holdToken.holdToken)
        await testClient.events.release(event_2.key, 'A-2', holdToken.holdToken)
        await testClient.events.book(event_2.key, 'A-3')

        global.event_3 = await testClient.events.create(chartKey)
        await testClient.events.book(event_3.key, 'A-1')
        await testClient.events.book(event_3.key, 'A-2')
        await testClient.events.book(event_3.key, 'A-3')
        await testClient.events.book(event_3.key, 'B-1')
    })

    test('should list status changes in the first page', async () => {
        let firstPage = await testClient.events.statusChanges(event_1.key).firstPage()

        let labels = [
            firstPage.items[0].objectLabel,
            firstPage.items[1].objectLabel,
            firstPage.items[2].objectLabel
        ]
        expect(labels.sort()).toEqual(['A-1', 'A-2', 'A-3'])
        expect(firstPage.items.length).toBe(3)
        expect(firstPage.nextPageStartsAfter).toBe(null)
        expect(firstPage.previousPageEndsBefore).toBe(null)
    })

    test('should list status changes in the first page with page size', async () => {
        let chartKey = testUtils.getChartKey()
        await testUtils.createTestChart(chartKey, user.secretKey)
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
        await testUtils.createTestChart(chartKey, user.secretKey)
        let event = await client.events.create(chartKey)
        let promises = [
            client.events.book(event.key, 'A-2'),
            client.events.book(event.key, 'A-1'),
            client.events.book(event.key, 'A-3')
        ]
        await Promise.all(promises)

        let params = new StatusChangesParams().sortDescending()
        let firstPage = await client.events.statusChanges(event.key).firstPage(params)

        let labels = [
            firstPage.items[0].objectLabel,
            firstPage.items[1].objectLabel,
            firstPage.items[2].objectLabel
        ]
        expect(labels.sort()).toEqual(['A-1', 'A-2', 'A-3'])
        expect(firstPage.items.length).toBe(3)
        expect(firstPage.nextPageStartsAfter).toBe(null)
        expect(firstPage.previousPageEndsBefore).toBe(null)
    })

    test('should list status changes in the first page sorted by ascending', async () => {
        let params = new StatusChangesParams().sortAscending()
        let firstPage = await testClient.events.statusChanges(event_1.key).firstPage(params)

        let labels = [
            firstPage.items[0].objectLabel,
            firstPage.items[1].objectLabel,
            firstPage.items[2].objectLabel
        ]
        expect(labels.sort()).toEqual(['A-1', 'A-2', 'A-3'])
        expect(firstPage.items.length).toBe(3)
        expect(firstPage.nextPageStartsAfter).toBe(null)
        expect(firstPage.previousPageEndsBefore).toBe(null)
    })

    test('should list status changes in the first page sorted by label', async () => {
        let params = new StatusChangesParams().sortByObjectLabel()
        let firstPage = await testClient.events.statusChanges(event_1.key).firstPage(params)

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
        let params = new StatusChangesParams().sortByObjectLabel().sortDescending()
        let firstPage = await testClient.events.statusChanges(event_1.key).firstPage(params)

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
        let params = new StatusChangesParams().sortByObjectLabel()

        let firstPage = await testClient.events.statusChanges(event_1.key).firstPage(params, 1)

        expect(firstPage.items[0].objectLabel).toEqual('A-1')
        expect(firstPage.items.length).toBe(1)
        expect(firstPage.nextPageStartsAfter).toBe(firstPage.items[0].id + '')
        expect(firstPage.previousPageEndsBefore).toBe(null)
    })

    test('should list status changes in the first page sorted by status', async () => {
        let params = new StatusChangesParams().sortByStatus()
        let firstPage = await testClient.events.statusChanges(event_2.key).firstPage(params)

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
        let params = new StatusChangesParams().sortByStatus().sortDescending()
        let firstPage = await testClient.events.statusChanges(event_2.key).firstPage(params)

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
        let params = new StatusChangesParams().sortByStatus()
        let firstPage = await testClient.events.statusChanges(event_2.key).firstPage(params, 2)

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
        let params = new StatusChangesParams().sortAscending()
        let firstPage = await testClient.events.statusChanges(event_2.key).firstPage(params)

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
        let params = new StatusChangesParams().sortAscending()
        let firstPage = await testClient.events.statusChanges(event_2.key).firstPage(params, 2)

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
        let params = new StatusChangesParams().withFilter('2')
        let firstPage = await testClient.events.statusChanges(event_2.key).firstPage(params)

        let labels = [
            firstPage.items[0].objectLabel,
            firstPage.items[1].objectLabel
        ]
        expect(labels).toEqual(['A-2', 'A-2'])
        expect(firstPage.items.length).toBe(2)
        expect(firstPage.nextPageStartsAfter).toBe(null)
        expect(firstPage.previousPageEndsBefore).toBe(null)
    })

    test('should list status changes in the first page with filter and page size', async () => {
        let params = new StatusChangesParams().withFilter('A')
        let firstPage = await testClient.events.statusChanges(event_1.key).firstPage(params, 1)

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
        await testUtils.createTestChart(chartKey, user.secretKey)
        let event = await client.events.create(chartKey)
        let promises = [
            client.events.book(event.key, 'A-1'),
            client.events.book(event.key, 'A-2')
        ]
        await Promise.all(promises)

        let params = new StatusChangesParams().withFilter('B')
        let firstPage = await client.events.statusChanges(event.key).firstPage(params)

        expect(firstPage.items).toEqual([])
    })

    test('list status changes filtered and sorted by label', async () => {
        let chartKey = testUtils.getChartKey()
        await testUtils.createTestChart(chartKey, user.secretKey)
        let event = await client.events.create(chartKey)
        let promises = [
            client.events.book(event.key, 'C-1'),
            client.events.book(event.key, 'A-1'),
            client.events.book(event.key, 'B-1'),
            client.events.book(event.key, 'A-2'),
            client.events.book(event.key, 'A-3')
        ]
        await Promise.all(promises)

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
        await testUtils.createTestChart(chartKey, user.secretKey)
        let event = await client.events.create(chartKey)
        let bookPromises = [
            client.events.book(event.key, 'B-1'),
            client.events.book(event.key, 'A-2'),
            client.events.book(event.key, 'A-3'),
            client.events.book(event.key, 'C-1')
        ]
        await Promise.all(bookPromises)

        let params = new StatusChangesParams().withFilter('1').sortAscending()
        let firstPage = await client.events.statusChanges(event.key).firstPage(params)

        let labels = [
            firstPage.items[0].objectLabel,
            firstPage.items[1].objectLabel
        ]
        expect(labels).toContain('B-1')
        expect(labels).toContain('C-1')
        expect(firstPage.items.length).toEqual(2)
    })

    test('list status changes filtered and sorted by status', async () => {
        let chartKey = testUtils.getChartKey()
        await testUtils.createTestChart(chartKey, user.secretKey)
        let event = await client.events.create(chartKey)
        let holdToken = await client.holdTokens.create()
        let bookPromises = [
            client.events.book(event.key, 'A-1'),
            client.events.hold(event.key, 'C-1', holdToken.holdToken),
            client.events.hold(event.key, 'B-1', holdToken.holdToken)
        ]
        await Promise.all(bookPromises)
        await client.events.release(event.key, 'C-1', holdToken.holdToken)

        let params = new StatusChangesParams().withFilter('1').sortByStatus()
        let firstPage = await client.events.statusChanges(event.key).firstPage(params)

        let labels = [
            firstPage.items[0].objectLabel,
            firstPage.items[1].objectLabel,
            firstPage.items[2].objectLabel,
            firstPage.items[3].objectLabel
        ]
        expect(labels.sort()).toEqual(['A-1', 'B-1', 'C-1', 'C-1'])
        expect(firstPage.items.length).toEqual(4)
    })

    test('list status changes based on latest parameter passed (and filter), chained', async () => {
        let params = new StatusChangesParams().sortAscending().withFilter('1').sortByObjectLabel()
        let firstPage = await testClient.events.statusChanges(event_3.key).firstPage(params)

        let labels = [
            firstPage.items[0].objectLabel,
            firstPage.items[1].objectLabel
        ]
        expect(labels).toEqual(['A-1', 'B-1'])
        expect(firstPage.items.length).toBe(2)
    })

    test("that parameter order doesn't matter for filtering and latest sortBy is taken into account", async () => {
        let params = new StatusChangesParams().sortAscending().sortByObjectLabel().withFilter('1')
        let firstPage = await testClient.events.statusChanges(event_3.key).firstPage(params)

        let labels = [
            firstPage.items[0].objectLabel,
            firstPage.items[1].objectLabel
        ]
        expect(labels).toEqual(['A-1', 'B-1'])
        expect(firstPage.items.length).toBe(2)
    })

    test('that combined sorting parameter still work, sorts based on the latest', async () => {
        let params = new StatusChangesParams().sortByDate().sortDescending().sortByObjectLabel().sortAscending()
        let firstPage = await testClient.events.statusChanges(event_3.key).firstPage(params)

        let labels = [
            firstPage.items[0].objectLabel,
            firstPage.items[1].objectLabel,
            firstPage.items[2].objectLabel,
            firstPage.items[3].objectLabel
        ]
        expect(labels).toEqual(['A-1', 'A-2', 'A-3', 'B-1'])
        expect(firstPage.items.length).toBe(4)
    })
})
