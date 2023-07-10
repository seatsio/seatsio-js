import { TestUtils } from '../testUtils'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo'
import { ObjectProperties } from '../../src/Events/ObjectProperties'
import { StatusChangesParams } from '../../src/Events/StatusChangesParams'
import { StatusChangeRequest } from '../../src/Events/StatusChangeRequest'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'
import { CreateEventParams } from '../../src/Events/CreateEventParams'
import { UpdateEventParams } from '../../src/Events/UpdateEventParams'

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

    expect(labels.sort()).toEqual(['A-1', 'A-2', 'A-3'])
})

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

    expect(labels).toEqual(['A-1', 'A-2', 'A-3'])
})

test('should list all status changes sorted by status', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest(event.key, 'B-1', EventObjectInfo.BOOKED, null, null, null, null, null, null, null),
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.HELD, holdToken.holdToken, null, null, null, null, null, null),
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.FREE, holdToken.holdToken, null, null, null, null, null, null),
        new StatusChangeRequest(event.key, 'A-2', EventObjectInfo.BOOKED, null, null, null, null, null, null, null),
        new StatusChangeRequest(event.key, 'A-3', EventObjectInfo.HELD, holdToken.holdToken, null, null, null, null, null, null)
    ])
    await TestUtils.statusChangesPresent(client, event.key, 5)

    const labels = []
    const params = new StatusChangesParams().sortByStatus()
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    expect(labels).toEqual(['A-2', 'B-1', 'A-1', 'A-3', 'A-1'])
})

test('should list all status changes sorted by date ascending', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.BOOKED, null, null, null, null, null, null, null),
        new StatusChangeRequest(event.key, 'A-3', EventObjectInfo.BOOKED, null, null, null, null, null, null, null),
        new StatusChangeRequest(event.key, 'A-2', EventObjectInfo.BOOKED, null, null, null, null, null, null, null)
    ])
    await TestUtils.statusChangesPresent(client, event.key, 3)

    const labels = []
    const params = new StatusChangesParams().sortByDate().sortAscending()
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    expect(labels).toEqual(['A-1', 'A-3', 'A-2'])
})

test('should list all status changes with filter', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.BOOKED, null, null, null, null, null, null, null),
        new StatusChangeRequest(event.key, 'A-2', EventObjectInfo.BOOKED, null, null, null, null, null, null, null),
        new StatusChangeRequest(event.key, 'B-2', EventObjectInfo.BOOKED, null, null, null, null, null, null, null)
    ])
    await TestUtils.statusChangesPresent(client, event.key, 3)

    const labels = []
    const params = new StatusChangesParams().withFilter('2')
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    expect(labels).toEqual(['B-2', 'A-2'])
})

test('should not list status changes with unmatched filter', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatusInBatch([
        new StatusChangeRequest(event.key, 'A-1', EventObjectInfo.BOOKED, null, null, null, null, null, null, null),
        new StatusChangeRequest(event.key, 'A-2', EventObjectInfo.BOOKED, null, null, null, null, null, null, null),
        new StatusChangeRequest(event.key, 'B-2', EventObjectInfo.BOOKED, null, null, null, null, null, null, null)
    ])
    await TestUtils.statusChangesPresent(client, event.key, 3)

    const labels = []
    const params = new StatusChangesParams().withFilter('3')
    for await (const statusChange of client.events.statusChanges(event.key).all(params)) {
        labels.push(statusChange.objectLabel)
    }

    expect(labels).toEqual([])
})

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
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withTableBookingConfig(TableBookingConfig.allByTable()))
    await client.events.book(event.key, 'T1')
    await client.events.update(event.key, new UpdateEventParams().withTableBookingConfig(TableBookingConfig.allBySeat()))
    await TestUtils.statusChangesPresent(client, event.key, 1)

    const statusChanges = client.events.statusChanges(event.key).all()
    const statusChangesIterator = statusChanges[Symbol.asyncIterator]()
    const statusChange = await statusChangesIterator.next()

    expect(statusChange.value.isPresentOnChart).toBe(false)
    expect(statusChange.value.notPresentOnChartReason).toBe('SWITCHED_TO_BOOK_BY_SEAT')
})

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

    expect(statusChange.value.holdToken).toEqual(holdToken.holdToken)
})

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

    expect(statusChange.value.holdToken).toEqual(null)
})
