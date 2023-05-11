import { TestUtils } from '../TestUtils'
import { IDs } from '../../src/Common/IDs'
import { ObjectProperties } from '../../src/Events/ObjectProperties.js'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo.js'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig.js'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report properties', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const extraData = { foo: 'bar' }
    await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1').setExtraData(extraData), null, 'order1')
    await client.events.channels.replace(event.key, {
        channel1: { name: 'channel 1', color: 'blue', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channel1: ['A-1'] })

    const report = await client.eventReports.byLabel(event.key)

    const reportItem = report['A-1'][0]
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.status).toBe(EventObjectInfo.BOOKED)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.label).toBe('A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.labels).toEqual(TestUtils.someLabels('1', 'seat', 'A', 'row'))
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.ids).toEqual(new IDs('1', 'A', null))
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.categoryLabel).toBe('Cat1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.categoryKey).toBe('9')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.ticketType).toBe('ticketType1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.orderId).toBe('order1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.objectType).toBe('seat')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.forSale).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.section).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.entrance).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.extraData).toEqual(extraData)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.isAccessible).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.isCompanionSeat).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.hasRestrictedView).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.displayedObjectType).toBe(undefined)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.leftNeighbour).toBe(undefined)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.rightNeighbour).toBe('A-2')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.isAvailable).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.availabilityReason).toBe('booked')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.isDisabledBySocialDistancing).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.bookAsAWhole).toBe(undefined)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.distanceToFocalPoint).toBeTruthy()
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report has hold token', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'A-1', holdToken.holdToken)

    const report = await client.eventReports.byLabel(event.key)

    const reportItem = report['A-1'][0]
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.holdToken).toBe(holdToken.holdToken)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report properties for GA', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('GA1')).setQuantity(5))
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, (new ObjectProperties('GA1')).setQuantity(3), holdToken.holdToken)

    const report = await client.eventReports.byLabel(event.key)

    const reportItem = report.GA1[0]
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.capacity).toBe(100)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.numBooked).toBe(5)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.numFree).toBe(92)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.numHeld).toBe(3)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.objectType).toBe('generalAdmission')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.isAccessible).toBe(undefined)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.isCompanionSeat).toBe(undefined)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.hasRestrictedView).toBe(undefined)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.displayedObjectType).toBe(undefined)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.bookAsAWhole).toBe(false)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report properties for table', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, null, TableBookingConfig.allByTable())

    const report = await client.eventReports.byLabel(event.key)

    const reportItem = report.T1[0]
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.numSeats).toBe(6)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.bookAsAWhole).toBe(false)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report with object status', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-2', 'lolzor')
    // @ts-expect-error TS(2339): Property 'BOOKED' does not exist on type 'typeof E... Remove this comment to see the full error message
    await client.events.changeObjectStatus(event.key, 'A-3', EventObjectInfo.BOOKED)

    const report = await client.eventReports.byStatus(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.lolzor.length).toBe(2)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report[EventObjectInfo.BOOKED].length).toBe(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report[EventObjectInfo.FREE].length).toBe(31)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report with specific object status', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-2', 'lolzor')
    // @ts-expect-error TS(2339): Property 'BOOKED' does not exist on type 'typeof E... Remove this comment to see the full error message
    await client.events.changeObjectStatus(event.key, 'A-3', EventObjectInfo.BOOKED)

    const report = await client.eventReports.byStatus(event.key, 'lolzor')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.lolzor.length).toBe(2)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report with category label', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byCategoryLabel(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.Cat1.length).toBe(17)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.Cat2.length).toBe(17)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report with specific category label', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byCategoryLabel(event.key, 'Cat1')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.Cat1.length).toBe(17)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report with category key', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byCategoryKey(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report[9].length).toBe(17)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report[10].length).toBe(17)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report with specific category key', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byCategoryKey(event.key, 9)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report[9].length).toBe(17)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report with label', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byLabel(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report['A-1'].length).toBe(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report['A-2'].length).toBe(1)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report with specific label', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byLabel(event.key, 'A-1')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report['A-1'].length).toBe(1)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report with orderId', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byOrderId(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.order1.length).toBe(2)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.order2.length).toBe(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.NO_ORDER_ID.length).toBe(31)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report with specific orderId', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byOrderId(event.key, 'order1')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.order1.length).toBe(2)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report with section', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.bySection(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.NO_SECTION.length).toBe(34)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report with specific section', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.bySection(event.key, 'NO_SECTION')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.NO_SECTION.length).toBe(34)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report by object type', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byObjectType(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.seat.length).toBe(32)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.generalAdmission.length).toBe(2)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.table.length).toBe(0)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.booth.length).toBe(0)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report by availability', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byAvailability(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.available.length).toBe(31)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.not_available.length).toBe(3)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report by specific availability', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byAvailability(event.key, 'available')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.available.length).toBe(31)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report by availability reason', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byAvailabilityReason(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.available.length).toBe(31)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.booked.length).toBe(3)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report by specific availability reason', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byAvailabilityReason(event.key, 'booked')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.booked.length).toBe(3)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report by channel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        channel1: { name: 'channel 1', color: 'blue', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channel1: ['A-1', 'A-2'] })

    const report = await client.eventReports.byChannel(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.channel1.length).toBe(2)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.NO_CHANNEL.length).toBe(32)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('report by specific channel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        channel1: { name: 'channel 1', color: 'blue', index: 1 }
    })
    await client.events.channels.setObjects(event.key, { channel1: ['A-1', 'A-2'] })

    const report = await client.eventReports.byChannel(event.key, 'channel1')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.channel1.length).toBe(2)
})
