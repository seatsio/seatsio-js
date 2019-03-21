const testUtils = require('../testUtils.js')
const helperFunctions = require('../../src/utilities/helperFunctions.js')
const ObjectProperties = require('../../src/Events/ObjectProperties.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')
const StatusChangesParams = require('../../src/Events/StatusChangesParams.js')

test('should list all status changes', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  let labels = []

  for await (let statusChange of client.events.statusChanges(event.key).all()) {
    labels.push(statusChange.objectLabel)
  }

  expect(labels.sort()).toEqual(['A-1', 'A-2', 'A-3'])
})

test('status changes parameter', async () => {
  let justFilter = new StatusChangesParams('foo')
  let sortAscendingOnly = new StatusChangesParams().sortAscending()
  let sortByStatusOnly = new StatusChangesParams().sortByStatus()
  let sortAscendingWithFilter = new StatusChangesParams('foo').sortAscending().withFilter('bar')
  let sortDescendingWithFilter = new StatusChangesParams().sortAscending().withFilter('bar').sortDescending()
  let sortByLabelDescendingWithFilter = new StatusChangesParams().sortAscending().withFilter('bar').sortByObjectLabel().sortDescending()
  let sortByStatusAscendingWithFilterChained = new StatusChangesParams().sortDescending().withFilter('bar').sortByObjectLabel().sortAscending().sortByStatus()

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
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  let labels = []

  let params = new StatusChangesParams().sortByObjectLabel()
  for await (let statusChange of client.events.statusChanges(event.key).all(params)) {
    labels.push(statusChange.objectLabel)
  }

  expect(labels).toEqual(['A-1', 'A-2', 'A-3'])
})

test('should list all status changes sorted by status', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let holdToken = await client.holdTokens.create()
  await client.events.book(event.key, 'B-1')
  await client.events.hold(event.key, 'A-1', holdToken.holdToken)
  await client.events.release(event.key, 'A-1', holdToken.holdToken)
  await client.events.book(event.key, 'A-2')
  await client.events.hold(event.key, 'A-3', holdToken.holdToken)
  let labels = []

  let params = new StatusChangesParams().sortByStatus()
  for await (let statusChange of client.events.statusChanges(event.key).all(params)) {
    labels.push(statusChange.objectLabel)
  }

  expect(labels).toEqual(['A-2', 'B-1', 'A-1', 'A-3', 'A-1'])
})

test('should list all status changes sorted by date ascending', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-3')
  await client.events.book(event.key, 'A-2')
  let labels = []

  let params = new StatusChangesParams().sortByDate().sortAscending()
  for await (let statusChange of client.events.statusChanges(event.key).all(params)) {
    labels.push(statusChange.objectLabel)
  }

  expect(labels).toEqual(['A-1', 'A-3', 'A-2'])
})

test('should list all status changes with filter', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'B-2')
  let labels = []

  let params = new StatusChangesParams().withFilter('2')
  for await (let statusChange of client.events.statusChanges(event.key).all(params)) {
    labels.push(statusChange.objectLabel)
  }

  expect(labels).toEqual(['B-2', 'A-2'])
})

test('should not list status changes with unmatched filter', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'B-2')
  let labels = []

  let params = new StatusChangesParams().withFilter('3')
  for await (let statusChange of client.events.statusChanges(event.key).all(params)) {
    labels.push(statusChange.objectLabel)
  }

  expect(labels).toEqual([])
})

test('properties of status changes', async () => {
  let chartKey = testUtils.getChartKey()
  let objectStatus = new ObjectStatus()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let obj = new ObjectProperties('A-1').setExtraData({ 'foo': 'bar' })
  let now = new Date().getTime()
  await client.events.book(event.key, obj, null, 'order1')

  let statusChanges = client.events.statusChanges(event.key).all()
  let statusChangesIterator = statusChanges[Symbol.asyncIterator]()
  let statusChange = await statusChangesIterator.next()

  expect(statusChange.value.id).toBeTruthy()
  expect(statusChange.value.date.getTime()).toBeGreaterThanOrEqual(now)
  expect(statusChange.value.date.getTime()).toBeLessThanOrEqual((now + 60000))
  expect(statusChange.value.orderId).toBe('order1')
  expect(statusChange.value.objectLabel).toBe('A-1')
  expect(statusChange.value.status).toBe(objectStatus.BOOKED)
  expect(statusChange.value.eventId).toBe(event.id)
  expect(statusChange.value.extraData).toEqual({ 'foo': 'bar' })
})

test('should list status changes with hold token', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let holdToken = await client.holdTokens.create()
  await client.events.hold(event.key, 'A-1', holdToken.holdToken)

  let statusChanges = client.events.statusChanges(event.key).all()
  let statusChangesIterator = statusChanges[Symbol.asyncIterator]()
  let statusChange = await statusChangesIterator.next()

  expect(statusChange.value.holdToken).toEqual(holdToken.holdToken)
})

test('should list status changes with null hold token if no hold token was used', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-2')

  let statusChanges = client.events.statusChanges(event.key).all()
  let statusChangesIterator = statusChanges[Symbol.asyncIterator]()
  let statusChange = await statusChangesIterator.next()

  expect(statusChange.value.holdToken).toEqual(null)
})
