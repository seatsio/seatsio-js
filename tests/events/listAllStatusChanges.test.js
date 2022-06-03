const testUtils = require('../testUtils.js')
const ObjectProperties = require('../../src/Events/ObjectProperties.js')
const EventObjectInfo = require('../../src/Events/EventObjectInfo.js')
const StatusChangesParams = require('../../src/Events/StatusChangesParams.js')
const { TableBookingconfig, StatusChangeRequest } = require('../../index')

test('should list all status changes', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, ['A-1', 'A-2', 'A-3'])
    await testUtils.statusChangesPresent(client, event.key, 3)

    const labels = []
    for await (const statusChange of client.events.statusChanges(event.key).all()) {
        labels.push(statusChange.objectLabel)
    }

    expect(labels.sort()).toEqual(['A-1', 'A-2', 'A-3'])
})

test('status changes parameter', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const justFilter = new StatusChangesParams('foo')
    const sortAscendingOnly = new StatusChangesParams().sortAscending()
    const sortByStatusOnly = new StatusChangesParams().sortByStatus()
    const sortAscendingWithFilter = new StatusChangesParams('foo').sortAscending().withFilter('bar')
    const sortDescendingWithFilter = new StatusChangesParams().sortAscending().withFilter('bar').sortDescending()
    const sortByLabelDescendingWithFilter = new StatusChangesParams().sortAscending().withFilter('bar').sortByObjectLabel().sortDescending()
    const sortByStatusAscendingWithFilterChained = new StatusChangesParams().sortDescending().withFilter('bar').sortByObjectLabel().sortAscending().sortByStatus()

    expect(justFilter.filter).toBe('foo')
    expect(justFilter.sortField).toBeNull()
    expect(justFilter.sortDirection).toBeNull()
    expect(sortAscendingOnly.filter).toBeNull()
    expect(sortAscendingOnly.sortField).toBeNull()
    expect(sortAscendingOnly.sortDirection).toBe('asc')
    expect(sortByStatusOnly.filter).toBeNull()
    expect(sortByStatusOnly.sortField).toBe('status')
    expect(sortAscendingWithFilter.filter).toBe('bar')
    expect(sortAscendingWithFilter.sortField).toBeNull()
    expect(sortAscendingWithFilter.sortDirection).toBe('asc')
    expect(sortDescendingWithFilter.filter).toBe('bar')
    expect(sortDescendingWithFilter.sortDirection).toBe('desc')
    expect(sortByLabelDescendingWithFilter.filter).toBe('bar')
    expect(sortByLabelDescendingWithFilter.sortField).toBe('objectLabel')
    expect(sortByLabelDescendingWithFilter.sortDirection).toBe('desc')
    expect(sortByStatusAscendingWithFilterChained.filter).toBe('bar')
    expect(sortByStatusAscendingWithFilterChained.sortField).toBe('status')
    expect(sortByStatusAscendingWithFilterChained.sortDirection).toBe('asc')
})

test('should list all status changes sorted by label', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, ['A-1', 'A-2', 'A-3'])
    await testUtils.statusChangesPresent(client, event.key, 3)

    const labels = []
    const params = new StatusChangesParams().sortByObjectLabel()
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    expect(labels).toEqual(['A-1', 'A-2', 'A-3'])
})

test('should list all status changes sorted by status', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest(event.key, 'B-1', EventObjectInfo.BOOKED),
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.HELD, holdToken.holdToken),
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.FREE, holdToken.holdToken),
        new StatusChangeRequest(event.key, 'A-2', EventObjectInfo.BOOKED),
        new StatusChangeRequest(event.key, 'A-3', EventObjectInfo.HELD, holdToken.holdToken)
    ])
    await testUtils.statusChangesPresent(client, event.key, 5)

    const labels = []
    const params = new StatusChangesParams().sortByStatus()
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    expect(labels).toEqual(['A-2', 'B-1', 'A-1', 'A-3', 'A-1'])
})

test('should list all status changes sorted by date ascending', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.BOOKED),
        new StatusChangeRequest(event.key, 'A-3', EventObjectInfo.BOOKED),
        new StatusChangeRequest(event.key, 'A-2', EventObjectInfo.BOOKED)
    ])
    await testUtils.statusChangesPresent(client, event.key, 3)

    const labels = []
    const params = new StatusChangesParams().sortByDate().sortAscending()
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    expect(labels).toEqual(['A-1', 'A-3', 'A-2'])
})

test('should list all status changes with filter', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.BOOKED),
        new StatusChangeRequest(event.key, 'A-2', EventObjectInfo.BOOKED),
        new StatusChangeRequest(event.key, 'B-2', EventObjectInfo.BOOKED)
    ])
    await testUtils.statusChangesPresent(client, event.key, 3)

    const labels = []
    const params = new StatusChangesParams().withFilter('2')
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    expect(labels).toEqual(['B-2', 'A-2'])
})

test('should not list status changes with unmatched filter', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.BOOKED),
        new StatusChangeRequest(event.key, 'A-2', EventObjectInfo.BOOKED),
        new StatusChangeRequest(event.key, 'B-2', EventObjectInfo.BOOKED)
    ])
    await testUtils.statusChangesPresent(client, event.key, 3)

    const labels = []
    const params = new StatusChangesParams().withFilter('3')
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    expect(labels).toEqual([])
})

test('properties of status changes', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const obj = new ObjectProperties('A-1').setExtraData({ foo: 'bar' })
    const now = new Date().getTime()
    await client.events.book(event.key, obj, null, 'order1')
    await testUtils.statusChangesPresent(client, event.key, 1)

    const statusChanges = client.events.statusChanges(event.key).all()
    const statusChangesIterator = statusChanges[Symbol.asyncIterator]()
    const statusChange = await statusChangesIterator.next()

    expect(statusChange.value.id).toBeTruthy()
    expect(statusChange.value.date.getTime()).toBeGreaterThanOrEqual(now - 5000)
    expect(statusChange.value.date.getTime()).toBeLessThanOrEqual(now + 5000)
    expect(statusChange.value.orderId).toBe('order1')
    expect(statusChange.value.objectLabel).toBe('A-1')
    expect(statusChange.value.status).toBe(EventObjectInfo.BOOKED)
    expect(statusChange.value.eventId).toBe(event.id)
    expect(statusChange.value.extraData).toEqual({ foo: 'bar' })
    expect(statusChange.value.origin.type).toBe('API_CALL')
    expect(statusChange.value.displayedLabel).toBe('A-1')
    expect(statusChange.value.isPresentOnChart).toBe(true)
    expect(statusChange.value.notPresentOnChartReason).toBe(undefined)
})

test('not present on chart anymore', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, null, TableBookingconfig.allByTable())
    await client.events.book(event.key, 'T1')
    await client.events.update(event.key, null, null, TableBookingconfig.allBySeat())
    await testUtils.statusChangesPresent(client, event.key, 1)

    const statusChanges = client.events.statusChanges(event.key).all()
    const statusChangesIterator = statusChanges[Symbol.asyncIterator]()
    const statusChange = await statusChangesIterator.next()

    expect(statusChange.value.isPresentOnChart).toBe(false)
    expect(statusChange.value.notPresentOnChartReason).toBe('SWITCHED_TO_BOOK_BY_SEAT')
})

test('should list status changes with hold token', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'A-1', holdToken.holdToken)
    await testUtils.statusChangesPresent(client, event.key, 1)

    const statusChanges = client.events.statusChanges(event.key).all()
    const statusChangesIterator = statusChanges[Symbol.asyncIterator]()
    const statusChange = await statusChangesIterator.next()

    expect(statusChange.value.holdToken).toEqual(holdToken.holdToken)
})

test('should list status changes with null hold token if no hold token was used', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-2')
    await testUtils.statusChangesPresent(client, event.key, 1)

    const statusChanges = client.events.statusChanges(event.key).all()
    const statusChangesIterator = statusChanges[Symbol.asyncIterator]()
    const statusChange = await statusChangesIterator.next()

    expect(statusChange.value.holdToken).toEqual(null)
})
