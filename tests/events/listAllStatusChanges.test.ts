import { TestUtils } from '../TestUtils'
import { ObjectProperties } from '../../src/Events/ObjectProperties.js'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo.js'
import { StatusChangesParams } from '../../src/Events/StatusChangesParams.js'
import { StatusChangeRequest } from '../../src/Events/StatusChangeRequest.js'
import { TableBookingConfig as TableBookingconfig } from '../../src/Events/TableBookingConfig.js'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list all status changes', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, ['A-1', 'A-2', 'A-3'])
    await TestUtils.statusChangesPresent(client, event.key, 3)

    const labels = []
    for await (const statusChange of client.events.statusChanges(event.key).all()) {
        labels.push(statusChange.objectLabel)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(labels.sort()).toEqual(['A-1', 'A-2', 'A-3'])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('status changes parameter', async () => {
    // @ts-expect-error TS(2345): Argument of type '"foo"' is not assignable to para... Remove this comment to see the full error message
    const justFilter = new StatusChangesParams('foo')
    const sortAscendingOnly = new StatusChangesParams().sortAscending()
    const sortByStatusOnly = new StatusChangesParams().sortByStatus()
    // @ts-expect-error TS(2345): Argument of type '"foo"' is not assignable to para... Remove this comment to see the full error message
    const sortAscendingWithFilter = new StatusChangesParams('foo').sortAscending().withFilter('bar')
    const sortDescendingWithFilter = new StatusChangesParams().sortAscending().withFilter('bar').sortDescending()
    const sortByLabelDescendingWithFilter = new StatusChangesParams().sortAscending().withFilter('bar').sortByObjectLabel().sortDescending()
    const sortByStatusAscendingWithFilterChained = new StatusChangesParams().sortDescending().withFilter('bar').sortByObjectLabel().sortAscending().sortByStatus()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(justFilter.filter).toBe('foo')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(justFilter.sortField).toBeNull()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(justFilter.sortDirection).toBeNull()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortAscendingOnly.filter).toBeNull()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortAscendingOnly.sortField).toBeNull()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortAscendingOnly.sortDirection).toBe('asc')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortByStatusOnly.filter).toBeNull()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortByStatusOnly.sortField).toBe('status')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortAscendingWithFilter.filter).toBe('bar')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortAscendingWithFilter.sortField).toBeNull()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortAscendingWithFilter.sortDirection).toBe('asc')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortDescendingWithFilter.filter).toBe('bar')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortDescendingWithFilter.sortDirection).toBe('desc')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortByLabelDescendingWithFilter.filter).toBe('bar')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortByLabelDescendingWithFilter.sortField).toBe('objectLabel')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortByLabelDescendingWithFilter.sortDirection).toBe('desc')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortByStatusAscendingWithFilterChained.filter).toBe('bar')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortByStatusAscendingWithFilterChained.sortField).toBe('status')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(sortByStatusAscendingWithFilterChained.sortDirection).toBe('asc')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list all status changes sorted by label', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, ['A-1', 'A-2', 'A-3'])
    await TestUtils.statusChangesPresent(client, event.key, 3)

    const labels = []
    const params = new StatusChangesParams().sortByObjectLabel()
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(labels).toEqual(['A-1', 'A-2', 'A-3'])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list all status changes sorted by status', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.changeObjectStatusInBatch([
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'B-1', EventObjectInfo.BOOKED),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 4.
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.HELD, holdToken.holdToken),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 4.
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.FREE, holdToken.holdToken),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'A-2', EventObjectInfo.BOOKED),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 4.
        new StatusChangeRequest(event.key, 'A-3', EventObjectInfo.HELD, holdToken.holdToken)
    ])
    await TestUtils.statusChangesPresent(client, event.key, 5)

    const labels = []
    const params = new StatusChangesParams().sortByStatus()
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(labels).toEqual(['A-2', 'B-1', 'A-1', 'A-3', 'A-1'])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list all status changes sorted by date ascending', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatusInBatch([
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.BOOKED),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'A-3', EventObjectInfo.BOOKED),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'A-2', EventObjectInfo.BOOKED)
    ])
    await TestUtils.statusChangesPresent(client, event.key, 3)

    const labels = []
    const params = new StatusChangesParams().sortByDate().sortAscending()
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(labels).toEqual(['A-1', 'A-3', 'A-2'])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list all status changes with filter', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatusInBatch([
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.BOOKED),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'A-2', EventObjectInfo.BOOKED),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'B-2', EventObjectInfo.BOOKED)
    ])
    await TestUtils.statusChangesPresent(client, event.key, 3)

    const labels = []
    const params = new StatusChangesParams().withFilter('2')
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(labels).toEqual(['B-2', 'A-2'])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should not list status changes with unmatched filter', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatusInBatch([
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.BOOKED),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'A-2', EventObjectInfo.BOOKED),
        // @ts-expect-error TS(2554): Expected 10 arguments, but got 3.
        new StatusChangeRequest(event.key, 'B-2', EventObjectInfo.BOOKED)
    ])
    await TestUtils.statusChangesPresent(client, event.key, 3)

    const labels = []
    const params = new StatusChangesParams().withFilter('3')
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(labels).toEqual([])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('properties of status changes', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const obj = new ObjectProperties('A-1').setExtraData({ foo: 'bar' })
    const now = new Date().getTime()
    await client.events.book(event.key, obj, null, 'order1')
    await TestUtils.statusChangesPresent(client, event.key, 1)

    const statusChanges = client.events.statusChanges(event.key).all()
    const statusChangesIterator = statusChanges[Symbol.asyncIterator]()
    const statusChange = await statusChangesIterator.next()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.id).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.date.getTime()).toBeGreaterThanOrEqual(now - 5000)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.date.getTime()).toBeLessThanOrEqual(now + 5000)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.orderId).toBe('order1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.objectLabel).toBe('A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.status).toBe(EventObjectInfo.BOOKED)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.eventId).toBe(event.id)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.extraData).toEqual({ foo: 'bar' })
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.origin.type).toBe('API_CALL')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.displayedLabel).toBe('A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.isPresentOnChart).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.notPresentOnChartReason).toBe(undefined)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('not present on chart anymore', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, null, TableBookingconfig.allByTable())
    await client.events.book(event.key, 'T1')
    await client.events.update(event.key, null, null, TableBookingconfig.allBySeat())
    await TestUtils.statusChangesPresent(client, event.key, 1)

    const statusChanges = client.events.statusChanges(event.key).all()
    const statusChangesIterator = statusChanges[Symbol.asyncIterator]()
    const statusChange = await statusChangesIterator.next()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.isPresentOnChart).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.notPresentOnChartReason).toBe('SWITCHED_TO_BOOK_BY_SEAT')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list status changes with hold token', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'A-1', holdToken.holdToken)
    await TestUtils.statusChangesPresent(client, event.key, 1)

    const statusChanges = client.events.statusChanges(event.key).all()
    const statusChangesIterator = statusChanges[Symbol.asyncIterator]()
    const statusChange = await statusChangesIterator.next()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.holdToken).toEqual(holdToken.holdToken)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list status changes with null hold token if no hold token was used', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-2')
    await TestUtils.statusChangesPresent(client, event.key, 1)

    const statusChanges = client.events.statusChanges(event.key).all()
    const statusChangesIterator = statusChanges[Symbol.asyncIterator]()
    const statusChange = await statusChangesIterator.next()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(statusChange.value.holdToken).toEqual(null)
})
