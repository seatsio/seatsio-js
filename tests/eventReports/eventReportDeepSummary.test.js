const testUtils = require('../testUtils.js')
const ObjectProperties = require('../../src/Events/ObjectProperties.js')

test('deepSummaryByStatus', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.deepSummaryByStatus(event.key)

    expect(report.booked.count).toEqual(1)
    expect(report.booked.bySection.NO_SECTION.count).toEqual(1)
    expect(report.booked.bySection.NO_SECTION.bySelectability.not_selectable).toEqual(1)
})

test('deepSummaryByCategoryKey', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.deepSummaryByCategoryKey(event.key)

    expect(report['9'].count).toEqual(116)
    expect(report['9'].bySection.NO_SECTION.count).toEqual(116)
    expect(report['9'].bySection.NO_SECTION.bySelectability.not_selectable).toEqual(1)
})

test('deepSummaryByCategoryLabel', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.deepSummaryByCategoryLabel(event.key)

    expect(report.Cat1.count).toEqual(116)
    expect(report.Cat1.bySection.NO_SECTION.count).toEqual(116)
    expect(report.Cat1.bySection.NO_SECTION.bySelectability.not_selectable).toEqual(1)
})

test('deepSummaryBySection', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.deepSummaryBySection(event.key)

    expect(report.NO_SECTION.count).toEqual(232)
    expect(report.NO_SECTION.byCategoryLabel.Cat1.count).toEqual(116)
    expect(report.NO_SECTION.byCategoryLabel.Cat1.bySelectability.not_selectable).toEqual(1)
})

test('deepSummaryBySelectability', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.deepSummaryBySelectability(event.key)

    expect(report.not_selectable.count).toEqual(1)
    expect(report.not_selectable.byCategoryLabel.Cat1.count).toEqual(1)
    expect(report.not_selectable.byCategoryLabel.Cat1.bySection.NO_SECTION).toEqual(1)
})

test('deepSummaryByChannel', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.deepSummaryByChannel(event.key)

    expect(report.NO_CHANNEL.count).toEqual(232)
    expect(report.NO_CHANNEL.byCategoryLabel.Cat1.count).toEqual(116)
    expect(report.NO_CHANNEL.byCategoryLabel.Cat1.bySection.NO_SECTION).toEqual(116)
})
