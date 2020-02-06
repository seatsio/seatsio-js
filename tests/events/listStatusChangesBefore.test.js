const testUtils = require('../testUtils.js')
const StatusChangesParams = require('../../src/Events/StatusChangesParams.js')

describe('statusChanges', () => {
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
        await testClient.events.book(event_2.key, 'A-2')
        await testClient.events.book(event_2.key, 'B-2')
        await testClient.events.book(event_2.key, 'C-2')
        global.firstPage_2 = await testClient.events.statusChanges(event_2.key).firstPage()

        global.event_3 = await testClient.events.create(chartKey)
        let holdToken = await testClient.holdTokens.create()
        await testClient.events.hold(event_3.key, 'A-2', holdToken.holdToken)
        await testClient.events.book(event_3.key, 'A-1')
        await testClient.events.release(event_3.key, 'A-2', holdToken.holdToken)
        await testClient.events.hold(event_3.key, 'A-3', holdToken.holdToken)
        global.firstPage_3 = await testClient.events.statusChanges(event_3.key).firstPage()

        global.event_4 = await testClient.events.create(chartKey)
        await testClient.events.book(event_4.key, 'A-1')
        await testClient.events.book(event_4.key, 'A-2')
        await testClient.events.book(event_4.key, 'A-3')
        await testClient.events.book(event_4.key, 'A-4')
        await testClient.events.book(event_4.key, 'A-5')
        global.firstPage_4 = await testClient.events.statusChanges(event_4.key).firstPage()
    })

    test('should list status changes before given id', async () => {
        let pageBefore = await testClient.events.statusChanges(event_1.key).pageBefore(firstPage_1.items[2].id)

        expect([pageBefore.items[0].objectLabel, pageBefore.items[1].objectLabel]).toEqual(['A-3', 'A-2'])
        expect(pageBefore.items.length).toBe(2)
        expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[1].id + '')
        expect(pageBefore.previousPageEndsBefore).toBe(null)
    })

    test('should list status changes before given id with page size', async () => {
        let pageBefore = await testClient.events.statusChanges(event_1.key).pageBefore(firstPage_1.items[2].id, null, 1)

        expect(pageBefore.items[0].objectLabel).toEqual('A-2')
        expect(pageBefore.items.length).toBe(1)
        expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[0].id + '')
        expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '')
    })

    test('should list status changes before given id sorted by label', async () => {
        let params = new StatusChangesParams().sortByObjectLabel()
        let pageBefore = await testClient.events.statusChanges(event_1.key).pageBefore(firstPage_1.items[0].id, params)

        let labels = [
            pageBefore.items[0].objectLabel,
            pageBefore.items[1].objectLabel
        ]
        expect(labels).toEqual(['A-1', 'A-2'])
        expect(pageBefore.items.length).toBe(2)
        expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[1].id + '')
        expect(pageBefore.previousPageEndsBefore).toBe(null)
    })

    test('should list status changes before given id sorted by label with page size', async () => {
        let params = new StatusChangesParams().sortByObjectLabel()
        let pageBefore = await testClient.events.statusChanges(event_1.key).pageBefore(firstPage_1.items[0].id, params, 1)

        let labels = [
            pageBefore.items[0].objectLabel
        ]
        expect(labels).toEqual(['A-2'])
        expect(pageBefore.items.length).toBe(1)
        expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[0].id + '')
        expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '')
    })

    test('should list status changes before given id sorted by status', async () => {
        let params = new StatusChangesParams().sortByStatus()
        let pageBefore = await testClient.events.statusChanges(event_3.key).pageBefore(firstPage_3.items[3].id, params)

        let labels = [
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
        let params = new StatusChangesParams().sortByStatus()
        let pageBefore = await testClient.events.statusChanges(event_3.key).pageBefore(firstPage_3.items[3].id, params, 2)

        let labels = [
            pageBefore.items[0].objectLabel,
            pageBefore.items[1].objectLabel
        ]
        expect(labels).toEqual(['A-2', 'A-3'])
        expect(pageBefore.items.length).toBe(2)
        expect(pageBefore.nextPageStartsAfter).toEqual(pageBefore.items[1].id + '')
        expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '')
    })

    test('should list status changes before given id sorted by date ascending', async () => {
        let params = new StatusChangesParams().sortAscending()
        let pageBefore = await testClient.events.statusChanges(event_4.key).pageBefore(firstPage_4.items[1].id, params)

        let labels = [
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
        let params = new StatusChangesParams().sortAscending()
        let pageBefore = await testClient.events.statusChanges(event_4.key).pageBefore(firstPage_4.items[1].id, params, 2)

        let labels = [
            pageBefore.items[0].objectLabel,
            pageBefore.items[1].objectLabel
        ]
        expect(labels).toEqual(['A-2', 'A-3'])
        expect(pageBefore.items.length).toBe(2)
        expect(pageBefore.nextPageStartsAfter).toEqual(pageBefore.items[1].id + '')
        expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '')
    })

    test('should list status changes before given id with filter', async () => {
        let params = new StatusChangesParams().withFilter('-2')
        let pageBefore = await testClient.events.statusChanges(event_2.key).pageBefore(firstPage_2.items[2].id, params)

        let labels = [
            pageBefore.items[0].objectLabel,
            pageBefore.items[1].objectLabel
        ]
        expect(labels).toEqual(['C-2', 'B-2'])
        expect(pageBefore.items.length).toBe(2)
        expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[1].id + '')
        expect(pageBefore.previousPageEndsBefore).toBe(null)
    })

    test('should list status changes before given id with filter and page size', async () => {
        let params = new StatusChangesParams().withFilter('2')
        let pageBefore = await testClient.events.statusChanges(event_2.key).pageBefore(firstPage_2.items[2].id, params, 1)

        let labels = [
            pageBefore.items[0].objectLabel
        ]
        expect(labels).toEqual(['B-2'])
        expect(pageBefore.items.length).toBe(1)
        expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[0].id + '')
        expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '')
    })

    test('should not list status changes before given id with unmatched filter', async () => {
        let params = new StatusChangesParams().withFilter('1')
        let pageBefore = await testClient.events.statusChanges(event_2.key).pageBefore(firstPage_2.items[2].id, params)

        expect(pageBefore.items).toEqual([])
    })
})
