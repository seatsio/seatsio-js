const testUtils = require('../testUtils.js')
const StatusChangesParams = require('../../src/Events/StatusChangesParams.js')

describe('list status changes after id', () => {
    beforeAll(async () => {
        jest.setTimeout(35000)
        let testUser = await testUtils.createTestUser()
        global.testClient = testUtils.createClient(testUser.secretKey)

        let chartKey = testUtils.getChartKey()
        await testUtils.createTestChart(chartKey, testUser.secretKey)

        global.event_1 = await testClient.events.create(chartKey)
        await testClient.events.book(event_1.key, 'A-1')
        await testClient.events.book(event_1.key, 'A-2')
        await testClient.events.book(event_1.key, 'A-3')
        global.firstPage_1 = await testClient.events.statusChanges(event_1.key).firstPage()

        global.event_2 = await testClient.events.create(chartKey)
        let holdToken = await testClient.holdTokens.create()
        await testClient.events.book(event_2.key, 'A-1')
        await testClient.events.hold(event_2.key, 'A-2', holdToken.holdToken)
        await testClient.events.hold(event_2.key, 'B-1', holdToken.holdToken)
        await testClient.events.release(event_2.key, 'A-2', holdToken.holdToken)
        await testClient.events.release(event_2.key, 'B-1', holdToken.holdToken)
        await testClient.events.book(event_2.key, 'A-3')
        global.firstPage_2 = await testClient.events.statusChanges(event_2.key).firstPage()

        global.event_3 = await testClient.events.create(chartKey)
        await testClient.events.book(event_3.key, 'A-1')
        await testClient.events.book(event_3.key, 'A-2')
        await testClient.events.book(event_3.key, 'A-3')
        await testClient.events.book(event_3.key, 'A-4')
        global.firstPage_3 = await testClient.events.statusChanges(event_3.key).firstPage()

        global.event_4 = await testClient.events.create(chartKey)
        let holdToken_4 = await testClient.holdTokens.create()
        await testClient.events.book(event_4.key, 'A-1')
        await testClient.events.hold(event_4.key, 'A-2', holdToken_4.holdToken)
        await testClient.events.hold(event_4.key, 'B-1', holdToken_4.holdToken)
        await testClient.events.book(event_4.key, 'A-3')
        global.firstPage_4 = await testClient.events.statusChanges(event_4.key).firstPage()
    })

    test('should list status changes after given id ', async () => {
        let pageAfter = await testClient.events.statusChanges(event_1.key).pageAfter(firstPage_1.items[0].id)

        let labels = [
            pageAfter.items[0].objectLabel,
            pageAfter.items[1].objectLabel
        ]
        expect(labels).toEqual(['A-2', 'A-1'])
        expect(pageAfter.items.length).toBe(2)
        expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
        expect(firstPage_1.nextPageStartsAfter).toBe(null)
    })

    test('should list status changes after given id with page size', async () => {
        let pageAfter = await testClient.events.statusChanges(event_1.key).pageAfter(firstPage_1.items[0].id, null, 1)

        expect(pageAfter.items[0].objectLabel).toEqual('A-2')
        expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
        expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '')
        expect(pageAfter.items.length).toBe(1)
    })

    test('should list status changes after given id sorted by label', async () => {
        let params = new StatusChangesParams().sortByObjectLabel()
        let pageAfter = await testClient.events.statusChanges(event_1.key).pageAfter(firstPage_1.items[2].id, params)

        let labels = [
            pageAfter.items[0].objectLabel,
            pageAfter.items[1].objectLabel
        ]
        expect(labels).toEqual(['A-2', 'A-3'])
        expect(pageAfter.items.length).toBe(2)
        expect(pageAfter.nextPageStartsAfter).toBe(null)
        expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
    })

    test('should list status changes after given id sorted by label with page size', async () => {
        let params = new StatusChangesParams().sortByObjectLabel()
        let pageAfter = await testClient.events.statusChanges(event_1.key).pageAfter(firstPage_1.items[2].id, params, 1)

        let labels = [
            pageAfter.items[0].objectLabel
        ]
        expect(labels).toEqual(['A-2'])
        expect(pageAfter.items.length).toBe(1)
        expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '')
        expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
    })

    test('should list status changes after given id sorted by status', async () => {
        let params = new StatusChangesParams().sortByStatus()
        let pageAfter = await testClient.events.statusChanges(event_2.key).pageAfter(firstPage_2.items[1].id, params)

        let labels = [
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
        let params = new StatusChangesParams().sortByStatus()
        let pageAfter = await testClient.events.statusChanges(event_2.key).pageAfter(firstPage_2.items[1].id, params, 2)

        let labels = [
            pageAfter.items[0].objectLabel,
            pageAfter.items[1].objectLabel
        ]
        expect(labels).toEqual(['A-2', 'B-1'])
        expect(pageAfter.items.length).toBe(2)
        expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[1].id + '')
        expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
    })

    test('should list status changes after given id sorted by date ascending', async () => {
        let params = new StatusChangesParams().sortAscending()
        let pageAfter = await testClient.events.statusChanges(event_3.key).pageAfter(firstPage_3.items[2].id, params)

        let labels = [
            pageAfter.items[0].objectLabel,
            pageAfter.items[1].objectLabel
        ]
        expect(labels).toEqual(['A-3', 'A-4'])
        expect(pageAfter.items.length).toBe(2)
        expect(pageAfter.nextPageStartsAfter).toBe(null)
        expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
    })

    test('should list status changes after given id sorted by date ascending with page size', async () => {
        let params = new StatusChangesParams().sortAscending()
        let pageAfter = await testClient.events.statusChanges(event_3.key).pageAfter(firstPage_3.items[2].id, params, 1)

        let labels = [
            pageAfter.items[0].objectLabel
        ]
        expect(labels).toEqual(['A-3'])
        expect(pageAfter.items.length).toBe(1)
        expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '')
        expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
    })

    test('should list status changes after given id with filter', async () => {
        let params = new StatusChangesParams().withFilter('1')
        let pageAfter = await testClient.events.statusChanges(event_4.key).pageAfter(firstPage_4.items[0].id, params)

        let labels = [
            pageAfter.items[0].objectLabel,
            pageAfter.items[1].objectLabel
        ]
        expect(labels).toEqual(['B-1', 'A-1'])
        expect(pageAfter.items.length).toBe(2)
        expect(pageAfter.nextPageStartsAfter).toBe(null)
        expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
    })

    test('should list status changes after given id with filter and page size', async () => {
        let params = new StatusChangesParams().withFilter('1')
        let pageAfter = await testClient.events.statusChanges(event_4.key).pageAfter(firstPage_4.items[0].id, params, 1)

        expect(pageAfter.items[0].objectLabel).toEqual('B-1')
        expect(pageAfter.items.length).toBe(1)
        expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '')
        expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
    })

    test('should not list status changes after given id with unmatched filter', async () => {
        let chartKey = testUtils.getChartKey()
        await testUtils.createTestChart(chartKey, user.secretKey)
        let event = await client.events.create(chartKey)
        await client.events.book(event.key, 'A-2')
        await client.events.book(event.key, 'B-2')
        await client.events.book(event.key, 'C-2')
        let firstPage = await client.events.statusChanges(event.key).firstPage()

        let params = new StatusChangesParams().withFilter('1')
        let pageAfter = await client.events.statusChanges(event.key).pageAfter(firstPage.items[0].id, params)

        expect(pageAfter.items).toEqual([])
    })
})
