import { TestUtils } from '../../testUtils'
import { IDs } from '../../../src/Common/IDs'
import { ObjectProperties } from '../../../src/Events/ObjectProperties'
import { EventObjectInfo } from '../../../src/Events/EventObjectInfo'
import { TableBookingConfig } from '../../../src/Events/TableBookingConfig'
import { CreateEventParams } from '../../../src/Events/CreateEventParams'
import { Channel } from '../../../src/Events/Channel'
import { SeasonParams } from '../../../src/Seasons/SeasonParams'

test('report properties', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channel1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1'] })
    ]))
    const extraData = { foo: 'bar' }
    await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1').setExtraData(extraData), null, 'order1', null, true)

    const report = await client.eventReports.byLabel(event.key)

    const reportItem = report['A-1'][0]
    expect(reportItem.status).toBe(EventObjectInfo.BOOKED)
    expect(reportItem.label).toBe('A-1')
    expect(reportItem.labels).toEqual(TestUtils.someLabels('1', 'seat', 'A', 'row'))
    expect(reportItem.ids).toEqual(new IDs('1', 'A', null))
    expect(reportItem.categoryLabel).toBe('Cat1')
    expect(reportItem.categoryKey).toBe('9')
    expect(reportItem.ticketType).toBe('ticketType1')
    expect(reportItem.orderId).toBe('order1')
    expect(reportItem.objectType).toBe('seat')
    expect(reportItem.forSale).toBe(true)
    expect(reportItem.section).toBeUndefined()
    expect(reportItem.entrance).toBeUndefined()
    expect(reportItem.extraData).toEqual(extraData)
    expect(reportItem.isAccessible).toBe(false)
    expect(reportItem.isCompanionSeat).toBe(false)
    expect(reportItem.hasRestrictedView).toBe(false)
    expect(reportItem.displayedObjectType).toBe(undefined)
    expect(reportItem.parentDisplayedObjectType).toBe(undefined)
    expect(reportItem.leftNeighbour).toBe(undefined)
    expect(reportItem.rightNeighbour).toBe('A-2')
    expect(reportItem.isAvailable).toBe(false)
    expect(reportItem.availabilityReason).toBe('booked')
    expect(reportItem.bookAsAWhole).toBe(undefined)
    expect(reportItem.distanceToFocalPoint).toBeTruthy()
    expect(reportItem.seasonStatusOverriddenQuantity).toBe(0)
    expect(reportItem.resaleListingId).toBe(undefined)

    const gaItem = report.GA1[0]
    expect(gaItem.variableOccupancy).toBe(true)
    expect(gaItem.minOccupancy).toBe(1)
    expect(gaItem.maxOccupancy).toBe(100)
})

test('report has hold token', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'A-1', holdToken.holdToken)

    const report = await client.eventReports.byLabel(event.key)

    const reportItem = report['A-1'][0]
    expect(reportItem.holdToken).toBe(holdToken.holdToken)
})

test('report has seasonStatusOverriddenQuantity', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey, new SeasonParams().numberOfEvents(1))
    const event = season.events![0]
    await client.events.overrideSeasonObjectStatus(event.key, ['A-1'])

    const report = await client.eventReports.byLabel(event.key)

    const reportItem = report['A-1'][0]
    expect(reportItem.seasonStatusOverriddenQuantity).toBe(1)
})

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
    expect(reportItem.capacity).toBe(100)
    expect(reportItem.numBooked).toBe(5)
    expect(reportItem.numFree).toBe(92)
    expect(reportItem.numHeld).toBe(3)
    expect(reportItem.numNotForSale).toBe(0)
    expect(reportItem.objectType).toBe('generalAdmission')
    expect(reportItem.isAccessible).toBe(undefined)
    expect(reportItem.isCompanionSeat).toBe(undefined)
    expect(reportItem.hasRestrictedView).toBe(undefined)
    expect(reportItem.displayedObjectType).toBe(undefined)
    expect(reportItem.parentDisplayedObjectType).toBe(undefined)
    expect(reportItem.bookAsAWhole).toBe(false)
})

test('report properties for table', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withTableBookingConfig(TableBookingConfig.allByTable()))

    const report = await client.eventReports.byLabel(event.key)

    const reportItem = report.T1[0]
    expect(reportItem.numSeats).toBe(6)
    expect(reportItem.bookAsAWhole).toBe(false)
})

test('report by object status', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-2', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-3', EventObjectInfo.BOOKED)

    const report = await client.eventReports.byStatus(event.key)

    expect(report.lolzor.length).toBe(2)
    expect(report[EventObjectInfo.BOOKED].length).toBe(1)
    expect(report[EventObjectInfo.FREE].length).toBe(31)
})

test('report by specific object status', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.changeObjectStatus(event.key, 'A-1', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-2', 'lolzor')
    await client.events.changeObjectStatus(event.key, 'A-3', EventObjectInfo.BOOKED)

    const report = await client.eventReports.byStatus(event.key, 'lolzor')

    expect(report.lolzor.length).toBe(2)
})

test('report by category label', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byCategoryLabel(event.key)

    expect(report.Cat1.length).toBe(17)
    expect(report.Cat2.length).toBe(17)
})

test('report by specific category label', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byCategoryLabel(event.key, 'Cat1')

    expect(report.Cat1.length).toBe(17)
})

test('report by category key', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byCategoryKey(event.key)

    expect(report[9].length).toBe(17)
    expect(report[10].length).toBe(17)
})

test('report by specific category key', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byCategoryKey(event.key, 9)

    expect(report[9].length).toBe(17)
})

test('report by label', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byLabel(event.key)

    expect(report['A-1'].length).toBe(1)
    expect(report['A-2'].length).toBe(1)
})

test('report by specific label', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byLabel(event.key, 'A-1')

    expect(report['A-1'].length).toBe(1)
})

test('report by orderId', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byOrderId(event.key)

    expect(report.order1.length).toBe(2)
    expect(report.order2.length).toBe(1)
    expect(report.NO_ORDER_ID.length).toBe(31)
})

test('report by specific orderId', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byOrderId(event.key, 'order1')

    expect(report.order1.length).toBe(2)
})

test('report by section', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.bySection(event.key)

    expect(report.NO_SECTION.length).toBe(34)
})

test('report by specific section', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.bySection(event.key, 'NO_SECTION')

    expect(report.NO_SECTION.length).toBe(34)
})

test('report by zone', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithZones(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byZone(event.key)

    expect(report.midtrack.length).toBe(6032)
    expect(report.midtrack[0].zone).toBe('midtrack')
})

test('report by specific zone', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithZones(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byZone(event.key, 'midtrack')

    expect(report.midtrack.length).toBe(6032)
})

test('report by object type', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.byObjectType(event.key)

    expect(report.seat.length).toBe(32)
    expect(report.generalAdmission.length).toBe(2)
    expect(report.table.length).toBe(0)
    expect(report.booth.length).toBe(0)
})

test('report by availability', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byAvailability(event.key)

    expect(report.available.length).toBe(31)
    expect(report.not_available.length).toBe(3)
})

test('report by specific availability', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byAvailability(event.key, 'available')

    expect(report.available.length).toBe(31)
})

test('report by availability reason', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byAvailabilityReason(event.key)

    expect(report.available.length).toBe(31)
    expect(report.booked.length).toBe(3)
})

test('report by specific availability reason', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, 'A-1', null, 'order1')
    await client.events.book(event.key, 'A-2', null, 'order1')
    await client.events.book(event.key, 'A-3', null, 'order2')

    const report = await client.eventReports.byAvailabilityReason(event.key, 'booked')

    expect(report.booked.length).toBe(3)
})

test('report by channel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channel1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1', 'A-2'] })
    ]))

    const report = await client.eventReports.byChannel(event.key)

    expect(report.channel1.length).toBe(2)
    expect(report.NO_CHANNEL.length).toBe(32)
})

test('report by specific channel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channel1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1', 'A-2'] })
    ]))

    const report = await client.eventReports.byChannel(event.key, 'channel1')

    expect(report.channel1.length).toBe(2)
})

test('report has resale listing ID', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.putUpForResale(event.key, 'A-1', 'listing1')

    const report = await client.eventReports.byLabel(event.key)

    const reportItem = report['A-1'][0]
    expect(reportItem.resaleListingId).toBe('listing1')
})
