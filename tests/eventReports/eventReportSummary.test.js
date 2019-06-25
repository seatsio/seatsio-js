const testUtils = require('../testUtils.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')
const ObjectProperties = require('../../src/Events/ObjectProperties.js')

test('summaryByStatus', async () => {
    let chartKey = testUtils.getChartKey()
    let objectStatus = new ObjectStatus()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1'), null, 'order1')

    let report = await client.eventReports.summaryByStatus(event.key)

    expect(report[objectStatus.BOOKED]['count']).toBe(1)
    expect(report[objectStatus.BOOKED]['bySection']['NO_SECTION']).toBe(1)
    expect(report[objectStatus.BOOKED]['byCategoryKey']['9']).toBe(1)
    expect(report[objectStatus.BOOKED]['byCategoryLabel']['Cat1']).toBe(1)
    expect(report[objectStatus.FREE]['count']).toBe(231)
    expect(report[objectStatus.FREE]['bySection']['NO_SECTION']).toBe(231)
    expect(report[objectStatus.FREE]['byCategoryKey']['9']).toBe(115)
    expect(report[objectStatus.FREE]['byCategoryKey']['10']).toBe(116)
    expect(report[objectStatus.FREE]['byCategoryLabel']['Cat1']).toBe(115)
    expect(report[objectStatus.FREE]['byCategoryLabel']['Cat2']).toBe(116)
})

test('summaryByCategoryKey', async () => {
    let chartKey = testUtils.getChartKey()
    let objectStatus = new ObjectStatus()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1'), null, 'order1')

    let report = await client.eventReports.summaryByCategoryKey(event.key)

    expect(report['9']['count']).toBe(116)
    expect(report['9']['bySection']['NO_SECTION']).toBe(116)
    expect(report['9']['byStatus'][objectStatus.BOOKED]).toBe(1)
    expect(report['9']['byStatus'][objectStatus.FREE]).toBe(115)
    expect(report['10']['count']).toBe(116)
    expect(report['10']['bySection']['NO_SECTION']).toBe(116)
    expect(report['10']['byStatus'][objectStatus.FREE]).toBe(116)
})

test('summaryByCategoryLabel', async () => {
    let chartKey = testUtils.getChartKey()
    let objectStatus = new ObjectStatus()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1'), null, 'order1')

    let report = await client.eventReports.summaryByCategoryLabel(event.key)

    expect(report['Cat1']['count']).toBe(116)
    expect(report['Cat1']['bySection']['NO_SECTION']).toBe(116)
    expect(report['Cat1']['byStatus'][objectStatus.BOOKED]).toBe(1)
    expect(report['Cat1']['byStatus'][objectStatus.FREE]).toBe(115)
    expect(report['Cat2']['count']).toBe(116)
    expect(report['Cat2']['bySection']['NO_SECTION']).toBe(116)
    expect(report['Cat2']['byStatus'][objectStatus.FREE]).toBe(116)
})

test('summaryBySection', async () => {
    let chartKey = testUtils.getChartKey()
    let objectStatus = new ObjectStatus()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1'), null, 'order1')

    let report = await client.eventReports.summaryBySection(event.key)

    expect(report['NO_SECTION']['count']).toBe(232)
    expect(report['NO_SECTION']['byStatus'][objectStatus.BOOKED]).toBe(1)
    expect(report['NO_SECTION']['byStatus'][objectStatus.FREE]).toBe(231)
    expect(report['NO_SECTION']['byCategoryKey']['9']).toBe(116)
    expect(report['NO_SECTION']['byCategoryKey']['10']).toBe(116)
    expect(report['NO_SECTION']['byCategoryLabel']['Cat1']).toBe(116)
    expect(report['NO_SECTION']['byCategoryLabel']['Cat2']).toBe(116)
})
