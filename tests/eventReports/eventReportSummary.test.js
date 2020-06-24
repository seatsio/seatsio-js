const testUtils = require('../testUtils.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')
const ObjectProperties = require('../../src/Events/ObjectProperties.js')

test('summaryByStatus', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1'), null, 'order1')

    const report = await client.eventReports.summaryByStatus(event.key)

    expect(report[ObjectStatus.BOOKED].count).toBe(1)
    expect(report[ObjectStatus.BOOKED].bySection.NO_SECTION).toBe(1)
    expect(report[ObjectStatus.BOOKED].byCategoryKey['9']).toBe(1)
    expect(report[ObjectStatus.BOOKED].byCategoryLabel.Cat1).toBe(1)
    expect(report[ObjectStatus.FREE].count).toBe(231)
    expect(report[ObjectStatus.FREE].bySection.NO_SECTION).toBe(231)
    expect(report[ObjectStatus.FREE].byCategoryKey['9']).toBe(115)
    expect(report[ObjectStatus.FREE].byCategoryKey['10']).toBe(116)
    expect(report[ObjectStatus.FREE].byCategoryLabel.Cat1).toBe(115)
    expect(report[ObjectStatus.FREE].byCategoryLabel.Cat2).toBe(116)
})

test('summaryByCategoryKey', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1'), null, 'order1')

    const report = await client.eventReports.summaryByCategoryKey(event.key)

    expect(report['9'].count).toBe(116)
    expect(report['9'].bySection.NO_SECTION).toBe(116)
    expect(report['9'].byStatus[ObjectStatus.BOOKED]).toBe(1)
    expect(report['9'].byStatus[ObjectStatus.FREE]).toBe(115)
    expect(report['10'].count).toBe(116)
    expect(report['10'].bySection.NO_SECTION).toBe(116)
    expect(report['10'].byStatus[ObjectStatus.FREE]).toBe(116)
})

test('summaryByCategoryLabel', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1'), null, 'order1')

    const report = await client.eventReports.summaryByCategoryLabel(event.key)

    expect(report.Cat1.count).toBe(116)
    expect(report.Cat1.bySection.NO_SECTION).toBe(116)
    expect(report.Cat1.byStatus[ObjectStatus.BOOKED]).toBe(1)
    expect(report.Cat1.byStatus[ObjectStatus.FREE]).toBe(115)
    expect(report.Cat2.count).toBe(116)
    expect(report.Cat2.bySection.NO_SECTION).toBe(116)
    expect(report.Cat2.byStatus[ObjectStatus.FREE]).toBe(116)
})

test('summaryBySection', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1'), null, 'order1')

    const report = await client.eventReports.summaryBySection(event.key)

    expect(report.NO_SECTION.count).toBe(232)
    expect(report.NO_SECTION.byStatus[ObjectStatus.BOOKED]).toBe(1)
    expect(report.NO_SECTION.byStatus[ObjectStatus.FREE]).toBe(231)
    expect(report.NO_SECTION.byCategoryKey['9']).toBe(116)
    expect(report.NO_SECTION.byCategoryKey['10']).toBe(116)
    expect(report.NO_SECTION.byCategoryLabel.Cat1).toBe(116)
    expect(report.NO_SECTION.byCategoryLabel.Cat2).toBe(116)
})
