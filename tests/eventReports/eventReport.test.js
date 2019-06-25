const testUtils = require('../testUtils.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')
const ObjectProperties = require('../../src/Events/ObjectProperties.js')

test('report properties', async () => {
    let chartKey = testUtils.getChartKey()
    let objectStatus = new ObjectStatus()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    let extraData = { 'foo': 'bar' }
    await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1').setExtraData(extraData), null, 'order1')

    let report = await client.eventReports.byLabel(event.key)

    let reportItem = report['A-1'][0]
    expect(reportItem.status).toBe(objectStatus.BOOKED)
    expect(reportItem.label).toBe('A-1')
    expect(reportItem.labels).toEqual(testUtils.someLabels('1', 'seat', 'A', 'row'))
    expect(reportItem.categoryLabel).toBe('Cat1')
    expect(reportItem.categoryKey).toBe('9')
    expect(reportItem.ticketType).toBe('ticketType1')
    expect(reportItem.orderId).toBe('order1')
    expect(reportItem.objectType).toBe('seat')
    expect(reportItem.forSale).toBe(true)
    expect(reportItem.section).toBeFalsy()
    expect(reportItem.entrance).toBeFalsy()
    expect(reportItem.extraData).toEqual(extraData)
})

test('report has hold token', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    let holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'A-1', holdToken.holdToken)

    let report = await client.eventReports.byLabel(event.key)

    let reportItem = report['A-1'][0]
    expect(reportItem.holdToken).toBe(holdToken.holdToken)
})

test('report properties for GA', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('GA1')).setQuantity(5))
    let holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, (new ObjectProperties('GA1')).setQuantity(3), holdToken.holdToken)

    let report = await client.eventReports.byLabel(event.key)

    let reportItem = report['GA1'][0]
    expect(reportItem.capacity).toBe(100)
    expect(reportItem.numBooked).toBe(5)
    expect(reportItem.numFree).toBe(92)
    expect(reportItem.numHeld).toBe(3)
    expect(reportItem.objectType).toBe('generalAdmission')
})

test('report with object status', async () => {
    let chartKey = testUtils.getChartKey()
    let objectStatus = new ObjectStatus()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-2', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-3', objectStatus.BOOKED)

    let report = await client.eventReports.byStatus(event.key)

    expect(report['lolzor'].length).toBe(2)
    expect(report[objectStatus.BOOKED].length).toBe(1)
    expect(report[objectStatus.FREE].length).toBe(31)
})

test('report with specific object status', async () => {
    let chartKey = testUtils.getChartKey()
    let objectStatus = new ObjectStatus()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-2', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-3', objectStatus.BOOKED)

    let report = await client.eventReports.byStatus(event.key, 'lolzor')

    expect(report['lolzor'].length).toBe(2)
})

test('report with category label', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)

    let report = await client.eventReports.byCategoryLabel(event.key)

    expect(report['Cat1'].length).toBe(17)
    expect(report['Cat2'].length).toBe(17)
})

test('report with specific category label', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)

    let report = await client.eventReports.byCategoryLabel(event.key, 'Cat1')

    expect(report['Cat1'].length).toBe(17)
})

test('report with category key', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)

    let report = await client.eventReports.byCategoryKey(event.key)

    expect(report[9].length).toBe(17)
    expect(report[10].length).toBe(17)
})

test('report with specific category key', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)

    let report = await client.eventReports.byCategoryKey(event.key, 9)

    expect(report[9].length).toBe(17)
})

test('report with label', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)

    let report = await client.eventReports.byLabel(event.key)

    expect(report['A-1'].length).toBe(1)
    expect(report['A-2'].length).toBe(1)
})

test('report with specific label', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)

    let report = await client.eventReports.byLabel(event.key, 'A-1')

    expect(report['A-1'].length).toBe(1)
})

test('report with orderId', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    let report = await client.eventReports.byOrderId(event.key)

    expect(report['order1'].length).toBe(2)
    expect(report['order2'].length).toBe(1)
    expect(report['NO_ORDER_ID'].length).toBe(31)
})

test('report with specific orderId', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    let report = await client.eventReports.byOrderId(event.key, 'order1')

    expect(report['order1'].length).toBe(2)
})

test('report with section', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    let report = await client.eventReports.bySection(event.key)

    expect(report['NO_SECTION'].length).toBe(34)
})

test('report with specific section', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    let report = await client.eventReports.bySection(event.key, 'NO_SECTION')

    expect(report['NO_SECTION'].length).toBe(34)
})

test('specific non existing status', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)

    let report = await client.eventReports.byStatus(event.key, 'lolzor')

    expect(report).toEqual({})
})

test('specific non existing section', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)

    let report = await client.eventReports.bySection(event.key, 'lolzor')

    expect(report).toEqual({})
})

test('specific non existing orderId', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)

    let report = await client.eventReports.byOrderId(event.key, 'lolzor')

    expect(report).toEqual({})
})

test('specific non existing label', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)

    let report = await client.eventReports.byLabel(event.key, 'lolzor')

    expect(report).toEqual({})
})

test('specific non existing categoryKey', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)

    let report = await client.eventReports.byCategoryKey(event.key, 'lolzor')

    expect(report).toEqual({})
})

test('specific non existing categoryLabel', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)

    let report = await client.eventReports.byCategoryLabel(event.key, 'lolzor')

    expect(report).toEqual({})
})
