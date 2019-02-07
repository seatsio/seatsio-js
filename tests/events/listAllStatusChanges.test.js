const testUtils = require('../testUtils.js')
const utils = require('../../src/utilities.js')
const ObjectProperties = require('../../src/Events/ObjectProperties.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')
const StatusChangeParam = require('../../src/Events/StatusChangesParams.js')

test('should list all status changes', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  let labels = []

  for await (let statusChange of client.events.statusChanges(event.key)) {
    labels.push(statusChange.objectLabel)
  }

  expect(labels.sort()).toEqual(['A-1', 'A-2', 'A-3'])
})

test('status changes parameter', async () => {
  let justFilter = utils.combineStatusChangesParams(new StatusChangeParam('foo'))
  let sortAscendingOnly = utils.combineStatusChangesParams(new StatusChangeParam().sortAscending())
  let sortByStatusOnly = utils.combineStatusChangesParams(new StatusChangeParam().sortByStatus())
  let sortAscendingWithFilter = utils.combineStatusChangesParams(new StatusChangeParam('foo').sortAscending().withFilter('bar'))
  let sortDescendingWithFilter = utils.combineStatusChangesParams(new StatusChangeParam().sortAscending().withFilter('bar').sortDescending())
  let sortByLabelDescendingWithFilter = utils.combineStatusChangesParams(new StatusChangeParam().sortAscending().withFilter('bar').sortByObjectLabel().sortDescending())
  let sortByStatusAscendingWithFilterChained = utils.combineStatusChangesParams(new StatusChangeParam().sortDescending().withFilter('bar').sortByObjectLabel().sortAscending().sortByStatus())

  expect(justFilter.filter).toBe('foo')
  expect(justFilter.sort).toBeNull()
  expect(sortAscendingOnly.filter).toBe(null)
  expect(sortAscendingOnly.sort).toBe('date:asc')
  expect(sortByStatusOnly.filter).toBe(null)
  expect(sortByStatusOnly.sort).toBe('status:asc')
  expect(sortAscendingWithFilter.filter).toBe('bar')
  expect(sortAscendingWithFilter.sort).toBe('date:asc')
  expect(sortDescendingWithFilter.filter).toBe('bar')
  expect(sortDescendingWithFilter.sort).toBe('date:desc')
  expect(sortByLabelDescendingWithFilter.filter).toBe('bar')
  expect(sortByLabelDescendingWithFilter.sort).toBe('objectLabel:desc')
  expect(sortByStatusAscendingWithFilterChained.filter).toBe('bar')
  expect(sortByStatusAscendingWithFilterChained.sort).toBe('status:asc')
})

test('should list all status changes sorted by label', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  let labels = []

  let params = new StatusChangeParam().sortByObjectLabel()
  for await (let statusChange of client.events.statusChanges(event.key, null, params)) {
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

  let params = new StatusChangeParam().sortByStatus()
  for await (let statusChange of client.events.statusChanges(event.key, null, params)) {
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

  let params = new StatusChangeParam().sortByDate().sortAscending()
  for await (let statusChange of client.events.statusChanges(event.key, null, params)) {
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

  let params = new StatusChangeParam().withFilter('2')
  for await (let statusChange of client.events.statusChanges(event.key, null, params)) {
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

  let params = new StatusChangeParam().withFilter('3')
  for await (let statusChange of client.events.statusChanges(event.key, null, params)) {
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
  await client.events.book(event.key, obj, null, 'order1')

  let statusChanges = client.events.statusChanges(event.key)
  let statusChangesIterator = statusChanges[Symbol.asyncIterator]()
  let statusChange = await statusChangesIterator.next()

  expect(statusChange.value.id).toBeTruthy()
  expect(statusChange.value.date).toBeTruthy()
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

  let statusChanges = client.events.statusChanges(event.key)
  let statusChangesIterator = statusChanges[Symbol.asyncIterator]()
  let statusChange = await statusChangesIterator.next()

  expect(statusChange.value.holdToken).toEqual(holdToken.holdToken)
})

test('should list status changes with null hold token if no hold token was used', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-2')

  let statusChanges = client.events.statusChanges(event.key)
  let statusChangesIterator = statusChanges[Symbol.asyncIterator]()
  let statusChange = await statusChangesIterator.next()

  expect(statusChange.value.holdToken).toEqual(null)
})

test('should list status changes after given id ', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')

  let firstPage = await client.events.listStatusChangesFirstPage(event.key)
  let pageAfter = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[0].id)

  let labels = [
    pageAfter.items[0].objectLabel,
    pageAfter.items[1].objectLabel
  ]
  expect(labels).toEqual(['A-2', 'A-1'])
  expect(pageAfter.items.length).toBe(2)
  expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
  expect(firstPage.nextPageStartsAfter).toBe(null)
})

test('should list status changes after given id with page size', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')

  let firstPage = await client.events.listStatusChangesFirstPage(event.key)
  let pageAfter = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[0].id, null, 1)

  expect(pageAfter.items[0].objectLabel).toEqual('A-2')
  expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
  expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '')
  expect(pageAfter.items.length).toBe(1)
})

test('should list status changes after given id sorted by label', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().sortByObjectLabel()
  let pageAfter = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[2].id, params)

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
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().sortByObjectLabel()
  let pageAfter = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[2].id, params, 1)

  let labels = [
    pageAfter.items[0].objectLabel
  ]
  expect(labels).toEqual(['A-2'])
  expect(pageAfter.items.length).toBe(1)
  expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '')
  expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
})

test('should list status changes after given id sorted by status', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let holdToken = await client.holdTokens.create()
  await client.events.book(event.key, 'A-1')
  await client.events.hold(event.key, 'A-2', holdToken.holdToken)
  await client.events.hold(event.key, 'B-1', holdToken.holdToken)
  await client.events.release(event.key, 'A-2', holdToken.holdToken)
  await client.events.release(event.key, 'B-1', holdToken.holdToken)
  await client.events.book(event.key, 'A-3')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().sortByStatus()
  let pageAfter = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[1].id, params)

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
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let holdToken = await client.holdTokens.create()
  await client.events.book(event.key, 'A-1')
  await client.events.hold(event.key, 'A-2', holdToken.holdToken)
  await client.events.hold(event.key, 'B-1', holdToken.holdToken)
  await client.events.release(event.key, 'A-2', holdToken.holdToken)
  await client.events.release(event.key, 'B-1', holdToken.holdToken)
  await client.events.book(event.key, 'A-3')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().sortByStatus()
  let pageAfter = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[1].id, params, 2)

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
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  await client.events.book(event.key, 'A-4')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().sortAscending()
  let pageAfter = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[2].id, params)

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
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  await client.events.book(event.key, 'A-4')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().sortAscending()
  let pageAfter = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[2].id, params, 1)

  let labels = [
    pageAfter.items[0].objectLabel
  ]
  expect(labels).toEqual(['A-3'])
  expect(pageAfter.items.length).toBe(1)
  expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '')
  expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
})

test('should list status changes after given id with filter', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let holdToken = await client.holdTokens.create()
  await client.events.book(event.key, 'A-1')
  await client.events.hold(event.key, 'A-2', holdToken.holdToken)
  await client.events.hold(event.key, 'B-1', holdToken.holdToken)
  await client.events.book(event.key, 'A-3')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().withFilter('1')
  let pageAfter = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[0].id, params)

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
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let holdToken = await client.holdTokens.create()
  await client.events.book(event.key, 'A-1')
  await client.events.hold(event.key, 'A-2', holdToken.holdToken)
  await client.events.hold(event.key, 'B-1', holdToken.holdToken)
  await client.events.book(event.key, 'A-3')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().withFilter('1')
  let pageAfter = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[0].id, params, 1)

  expect(pageAfter.items[0].objectLabel).toEqual('B-1')
  expect(pageAfter.items.length).toBe(1)
  expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '')
  expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '')
})

test('should not list status changes after given id with unmatched filter', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'B-2')
  await client.events.book(event.key, 'C-2')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().withFilter('1')
  let pageBefore = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[0].id, params)

  expect(pageBefore.items).toEqual([])
})

test('should list status changes before given id', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[2].id)

  expect([pageBefore.items[0].objectLabel, pageBefore.items[1].objectLabel]).toEqual(['A-3', 'A-2'])
  expect(pageBefore.items.length).toBe(2)
  expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[1].id + '')
  expect(pageBefore.previousPageEndsBefore).toBe(null)
})

test('should list status changes before given id with page size', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[2].id, null, 1)

  expect(pageBefore.items[0].objectLabel).toEqual('A-2')
  expect(pageBefore.items.length).toBe(1)
  expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[0].id + '')
  expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '')
})

test('should list status changes before given id sorted by label', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().sortByObjectLabel()
  let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[0].id, params)

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
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().sortByObjectLabel()
  let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[0].id, params, 1)

  let labels = [
    pageBefore.items[0].objectLabel
  ]
  expect(labels).toEqual(['A-2'])
  expect(pageBefore.items.length).toBe(1)
  expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[0].id + '')
  expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '')
})

test('should list status changes before given id sorted by status', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let holdToken = await client.holdTokens.create()
  await client.events.hold(event.key, 'A-2', holdToken.holdToken)
  await client.events.book(event.key, 'A-1')
  await client.events.release(event.key, 'A-2', holdToken.holdToken)
  await client.events.hold(event.key, 'A-3', holdToken.holdToken)
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().sortByStatus()
  let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[3].id, params)

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
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let holdToken = await client.holdTokens.create()
  await client.events.hold(event.key, 'A-2', holdToken.holdToken)
  await client.events.book(event.key, 'A-1')
  await client.events.release(event.key, 'A-2', holdToken.holdToken)
  await client.events.hold(event.key, 'A-3', holdToken.holdToken)
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().sortByStatus()
  let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[3].id, params, 2)

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
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  await client.events.book(event.key, 'A-4')
  await client.events.book(event.key, 'A-5')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().sortAscending()
  let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[1].id, params)

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
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-1')
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'A-3')
  await client.events.book(event.key, 'A-4')
  await client.events.book(event.key, 'A-5')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().sortAscending()
  let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[1].id, params, 2)

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
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'B-2')
  await client.events.book(event.key, 'C-2')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().withFilter('-2')
  let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[2].id, params)

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
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'B-2')
  await client.events.book(event.key, 'C-2')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().withFilter('2')
  let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[2].id, params, 1)

  let labels = [
    pageBefore.items[0].objectLabel
  ]
  expect(labels).toEqual(['B-2'])
  expect(pageBefore.items.length).toBe(1)
  expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[0].id + '')
  expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '')
})

test('should not list status changes before given id with unmatched filter', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  await client.events.book(event.key, 'A-2')
  await client.events.book(event.key, 'B-2')
  await client.events.book(event.key, 'C-2')
  let firstPage = await client.events.listStatusChangesFirstPage(event.key)

  let params = new StatusChangeParam().withFilter('1')
  let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[2].id, params)

  expect(pageBefore.items).toEqual([])
})
