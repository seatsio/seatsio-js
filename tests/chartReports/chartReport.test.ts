import { TestUtils } from '../TestUtils'
import { IDs } from '../../src/Common/IDs'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('chart report properties', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.byLabel(chartKey)

    const reportItem = report['A-1'][0]
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
    expect(reportItem.objectType).toBe('seat')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.section).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.entrance).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.leftNeighbour).toBe(undefined)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.rightNeighbour).toBe('A-2')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.bookAsAWhole).toBe(undefined)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.distanceToFocalPoint).toBeTruthy()
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('chart report properties for GA', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.byLabel(chartKey)

    const reportItem = report.GA1[0]
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.capacity).toBe(100)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.objectType).toBe('generalAdmission')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.bookAsAWhole).toBe(false)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('chart report properties for table', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)

    const report = await client.chartReports.byLabel(chartKey, 'true')

    const reportItem = report.T1[0]
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.numSeats).toBe(6)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(reportItem.bookAsAWhole).toBe(false)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get report byLabel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.byLabel(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report['A-1'].length).toBe(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report['A-2'].length).toBe(1)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get report byObjectType', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.byObjectType(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.seat.length).toBe(32)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.generalAdmission.length).toBe(2)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get report byLabel, bookWholeTables not passed in', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)

    const report = await client.chartReports.byLabel(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(new Set(Object.keys(report))).toEqual(new Set(['T1-1', 'T1-2', 'T1-3', 'T1-4', 'T1-5', 'T1-6', 'T2-1', 'T2-2', 'T2-3', 'T2-4', 'T2-5', 'T2-6', 'T1', 'T2']))
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get report byLabel, bookWholeTables chart', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)

    const report = await client.chartReports.byLabel(chartKey, 'chart')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(new Set(Object.keys(report))).toEqual(new Set(['T1-1', 'T1-2', 'T1-3', 'T1-4', 'T1-5', 'T1-6', 'T2']))
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get report byLabel, bookWholeTables true', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)

    const report = await client.chartReports.byLabel(chartKey, 'true')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(new Set(Object.keys(report))).toEqual(new Set(['T1', 'T2']))
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get report byLabel, bookWholeTables false', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)

    const report = await client.chartReports.byLabel(chartKey, 'false')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(new Set(Object.keys(report))).toEqual(new Set(['T1-1', 'T1-2', 'T1-3', 'T1-4', 'T1-5', 'T1-6', 'T2-1', 'T2-2', 'T2-3', 'T2-4', 'T2-5', 'T2-6']))
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get report byCategoryKey', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.byCategoryKey(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report['9'].length).toBe(17)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report['10'].length).toBe(17)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get report byCategoryLabel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.byCategoryLabel(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.Cat1.length).toBe(17)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report.Cat2.length).toBe(17)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get report bySection', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithSections(chartKey, user.secretKey)

    const report = await client.chartReports.bySection(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report['Section A'].length).toBe(36)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(report['Section B'].length).toBe(35)
})
