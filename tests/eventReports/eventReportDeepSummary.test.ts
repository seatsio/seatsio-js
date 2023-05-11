import { TestUtils } from '../TestUtils'
import { ObjectProperties } from '../../src/Events/ObjectProperties'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('deepSummaryByStatus', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.deepSummaryByStatus(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.booked.count).toEqual(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.booked.bySection.NO_SECTION.count).toEqual(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.booked.bySection.NO_SECTION.bySelectability.not_selectable).toEqual(1)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('deepSummaryByObjectType', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.deepSummaryByObjectType(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.seat.count).toEqual(32)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.seat.bySection.NO_SECTION.count).toEqual(32)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.seat.bySection.NO_SECTION.bySelectability.selectable).toEqual(32)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('deepSummaryByCategoryKey', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.deepSummaryByCategoryKey(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report['9'].count).toEqual(116)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report['9'].bySection.NO_SECTION.count).toEqual(116)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report['9'].bySection.NO_SECTION.bySelectability.not_selectable).toEqual(1)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('deepSummaryByCategoryLabel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.deepSummaryByCategoryLabel(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.Cat1.count).toEqual(116)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.Cat1.bySection.NO_SECTION.count).toEqual(116)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.Cat1.bySection.NO_SECTION.bySelectability.not_selectable).toEqual(1)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('deepSummaryBySection', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.deepSummaryBySection(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.NO_SECTION.count).toEqual(232)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.NO_SECTION.byCategoryLabel.Cat1.count).toEqual(116)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.NO_SECTION.byCategoryLabel.Cat1.bySelectability.not_selectable).toEqual(1)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('deepSummaryByAvailability', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.deepSummaryByAvailability(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.not_available.count).toEqual(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.not_available.byCategoryLabel.Cat1.count).toEqual(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.not_available.byCategoryLabel.Cat1.bySection.NO_SECTION).toEqual(1)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('deepSummaryByAvailabilityReason', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.deepSummaryByAvailabilityReason(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.booked.count).toEqual(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.booked.byCategoryLabel.Cat1.count).toEqual(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.booked.byCategoryLabel.Cat1.bySection.NO_SECTION).toEqual(1)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('deepSummaryByChannel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.deepSummaryByChannel(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.NO_CHANNEL.count).toEqual(232)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.NO_CHANNEL.byCategoryLabel.Cat1.count).toEqual(116)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.NO_CHANNEL.byCategoryLabel.Cat1.bySection.NO_SECTION).toEqual(116)
})
