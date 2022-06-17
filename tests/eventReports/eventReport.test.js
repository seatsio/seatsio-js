const testUtils = require('../testUtils.js')
const EventObjectInfo = require('../../src/Events/EventObjectInfo.js')
const ObjectProperties = require('../../src/Events/ObjectProperties.js')
const { IDs } = require('../../src/Common/IDs')
const { TableBookingconfig } = require('../../index')

test('report properties', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const extraData = { foo: 'bar' }
    await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1').setExtraData(extraData), null, 'order1')
    await client.events.channels.replace(event.key, {
        channel1: { name: 'channel 1', color: 'blue', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channel1: ['A-1'] })

    const report = await client.eventReports.byLabel(event.key)

    const reportItem = report['A-1'][0]
    expect(reportItem.status).toBe(EventObjectInfo.BOOKED)
    expect(reportItem.label).toBe('A-1')
    expect(reportItem.labels).toEqual(testUtils.someLabels('1', 'seat', 'A', 'row'))
    expect(reportItem.ids).toEqual(new IDs('1', 'A', null))
    expect(reportItem.categoryLabel).toBe('Cat1')
    expect(reportItem.categoryKey).toBe('9')
    expect(reportItem.ticketType).toBe('ticketType1')
    expect(reportItem.orderId).toBe('order1')
    expect(reportItem.objectType).toBe('seat')
    expect(reportItem.forSale).toBe(true)
    expect(reportItem.section).toBeFalsy()
    expect(reportItem.entrance).toBeFalsy()
    expect(reportItem.extraData).toEqual(extraData)
    expect(reportItem.isAccessible).toBe(false)
    expect(reportItem.isCompanionSeat).toBe(false)
    expect(reportItem.hasRestrictedView).toBe(false)
    expect(reportItem.displayedObjectType).toBe(undefined)
    expect(reportItem.leftNeighbour).toBe(undefined)
    expect(reportItem.rightNeighbour).toBe('A-2')
    expect(reportItem.isAvailable).toBe(false)
    expect(reportItem.availabilityReason).toBe('booked')
    expect(reportItem.isDisabledBySocialDistancing).toBe(false)
    expect(reportItem.bookAsAWhole).toBe(undefined)
    expect(reportItem.distanceToFocalPoint).toBeTruthy()
})

test('report has hold token', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'A-1', holdToken.holdToken)

    const report = await client.eventReports.byLabel(event.key)

    const reportItem = report['A-1'][0]
    expect(reportItem.holdToken).toBe(holdToken.holdToken)
})

test('report properties for GA', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('GA1')).setQuantity(5))
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, (new ObjectProperties('GA1')).setQuantity(3), holdToken.holdToken)

    const report = await client.eventReports.byLabel(event.key)

    const reportItem = report.GA1[0]
    expect(reportItem.capacity).toBe(100)
    expect(reportItem.numBooked).toBe(5)
    expect(reportItem.numFree).toBe(92)
    expect(reportItem.numHeld).toBe(3)
    expect(reportItem.objectType).toBe('generalAdmission')
    expect(reportItem.isAccessible).toBe(undefined)
    expect(reportItem.isCompanionSeat).toBe(undefined)
    expect(reportItem.hasRestrictedView).toBe(undefined)
    expect(reportItem.displayedObjectType).toBe(undefined)
    expect(reportItem.bookAsAWhole).toBe(false)
})

test('report properties for table', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, null, TableBookingconfig.allByTable())

    const report = await client.eventReports.byLabel(event.key)

    const reportItem = report.T1[0]
    expect(reportItem.numSeats).toBe(6)
    expect(reportItem.bookAsAWhole).toBe(false)
})

test('report with object status', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-2', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-3', EventObjectInfo.BOOKED)

    const report = await client.eventReports.byStatus(event.key)

    expect(report.lolzor.length).toBe(2)
    expect(report[EventObjectInfo.BOOKED].length).toBe(1)
    expect(report[EventObjectInfo.FREE].length).toBe(31)
})

test('report with specific object status', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-2', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-3', EventObjectInfo.BOOKED)

    const report = await client.eventReports.byStatus(event.key, 'lolzor')

    expect(report.lolzor.length).toBe(2)
})

test('report with category label', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byCategoryLabel(event.key)

    expect(report.Cat1.length).toBe(17)
    expect(report.Cat2.length).toBe(17)
})

test('report with specific category label', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byCategoryLabel(event.key, 'Cat1')

    expect(report.Cat1.length).toBe(17)
})

test('report with category key', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byCategoryKey(event.key)

    expect(report[9].length).toBe(17)
    expect(report[10].length).toBe(17)
})

test('report with specific category key', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byCategoryKey(event.key, 9)

    expect(report[9].length).toBe(17)
})

test('report with label', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byLabel(event.key)

    expect(report['A-1'].length).toBe(1)
    expect(report['A-2'].length).toBe(1)
})

test('report with specific label', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byLabel(event.key, 'A-1')

    expect(report['A-1'].length).toBe(1)
})

test('report with orderId', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byOrderId(event.key)

    expect(report.order1.length).toBe(2)
    expect(report.order2.length).toBe(1)
    expect(report.NO_ORDER_ID.length).toBe(31)
})

test('report with specific orderId', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byOrderId(event.key, 'order1')

    expect(report.order1.length).toBe(2)
})

test('report with section', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.bySection(event.key)

    expect(report.NO_SECTION.length).toBe(34)
})

test('report with specific section', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.bySection(event.key, 'NO_SECTION')

    expect(report.NO_SECTION.length).toBe(34)
})

test('report by object type', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byObjectType(event.key)

    expect(report.seat.length).toBe(32)
    expect(report.generalAdmission.length).toBe(2)
    expect(report.table.length).toBe(0)
    expect(report.booth.length).toBe(0)
})

test('report by availability', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byAvailability(event.key)

    expect(report.available.length).toBe(31)
    expect(report.not_available.length).toBe(3)
})

test('report by specific availability', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byAvailability(event.key, 'available')

    expect(report.available.length).toBe(31)
})

test('report by availability reason', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byAvailabilityReason(event.key)

    expect(report.available.length).toBe(31)
    expect(report.booked.length).toBe(3)
})

test('report by specific availability reason', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byAvailabilityReason(event.key, 'booked')

    expect(report.booked.length).toBe(3)
})

test('report by channel', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        channel1: { name: 'channel 1', color: 'blue', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channel1: ['A-1', 'A-2'] })

    const report = await client.eventReports.byChannel(event.key)

    expect(report.channel1.length).toBe(2)
    expect(report.NO_CHANNEL.length).toBe(32)
})

test('report by specific channel', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        channel1: { name: 'channel 1', color: 'blue', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channel1: ['A-1', 'A-2'] })

    const report = await client.eventReports.byChannel(event.key, 'channel1')

    expect(report.channel1.length).toBe(2)
})
