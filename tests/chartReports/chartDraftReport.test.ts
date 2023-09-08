import { TestUtils } from '../testUtils'
import { IDs } from '../../src/Common/IDs'
import { Versions } from '../../src'

test('chart report properties', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    await TestUtils.makeDraftChart(client, chartKey)

    const report = await client.chartReports.byLabel(chartKey, undefined, Versions.draftVersion)

    const reportItem = report['A-1'][0]
    expect(reportItem.label).toBe('A-1')
    expect(reportItem.labels).toEqual(TestUtils.someLabels('1', 'seat', 'A', 'row'))
    expect(reportItem.ids).toEqual(new IDs('1', 'A', null))
    expect(reportItem.categoryLabel).toBe('Cat1')
    expect(reportItem.categoryKey).toBe('9')
    expect(reportItem.objectType).toBe('seat')
    expect(reportItem.section).toBeUndefined()
    expect(reportItem.entrance).toBeUndefined()
    expect(reportItem.leftNeighbour).toBe(undefined)
    expect(reportItem.rightNeighbour).toBe('A-2')
    expect(reportItem.bookAsAWhole).toBe(undefined)
    expect(reportItem.distanceToFocalPoint).toBeTruthy()
    expect(reportItem.isAccessible).toBeDefined()
    expect(reportItem.isCompanionSeat).toBeDefined()
    expect(reportItem.hasRestrictedView).toBeDefined()
})

test('chart report properties for GA', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    await TestUtils.makeDraftChart(client, chartKey)

    const report = await client.chartReports.byLabel(chartKey, undefined, Versions.draftVersion)

    const reportItem = report.GA1[0]
    expect(reportItem.capacity).toBe(100)
    expect(reportItem.objectType).toBe('generalAdmission')
    expect(reportItem.bookAsAWhole).toBe(false)
})

test('chart report properties for table', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    await TestUtils.makeDraftChart(client, chartKey)

    const report = await client.chartReports.byLabel(chartKey, 'true', Versions.draftVersion)

    const reportItem = report.T1[0]
    expect(reportItem.numSeats).toBe(6)
    expect(reportItem.bookAsAWhole).toBe(false)
})

test('get report byLabel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    await TestUtils.makeDraftChart(client, chartKey)

    const report = await client.chartReports.byLabel(chartKey, undefined, Versions.draftVersion)

    expect(report['A-1'].length).toBe(1)
    expect(report['A-2'].length).toBe(1)
})

test('get report byObjectType', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    await TestUtils.makeDraftChart(client, chartKey)

    const report = await client.chartReports.byObjectType(chartKey, undefined, Versions.draftVersion)

    expect(report.seat.length).toBe(32)
    expect(report.generalAdmission.length).toBe(2)
})

test('get report byLabel, bookWholeTables not passed in', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    await TestUtils.makeDraftChart(client, chartKey)

    const report = await client.chartReports.byLabel(chartKey, undefined, Versions.draftVersion)

    expect(new Set(Object.keys(report))).toEqual(new Set(['T1-1', 'T1-2', 'T1-3', 'T1-4', 'T1-5', 'T1-6', 'T2-1', 'T2-2', 'T2-3', 'T2-4', 'T2-5', 'T2-6', 'T1', 'T2']))
})

test('get report byLabel, bookWholeTables chart', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    await TestUtils.makeDraftChart(client, chartKey)

    const report = await client.chartReports.byLabel(chartKey, 'chart', Versions.draftVersion)

    expect(new Set(Object.keys(report))).toEqual(new Set(['T1-1', 'T1-2', 'T1-3', 'T1-4', 'T1-5', 'T1-6', 'T2']))
})

test('get report byLabel, bookWholeTables true', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    await TestUtils.makeDraftChart(client, chartKey)

    const report = await client.chartReports.byLabel(chartKey, 'true', Versions.draftVersion)

    expect(new Set(Object.keys(report))).toEqual(new Set(['T1', 'T2']))
})

test('get report byLabel, bookWholeTables false', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    await TestUtils.makeDraftChart(client, chartKey)

    const report = await client.chartReports.byLabel(chartKey, 'false', Versions.draftVersion)

    expect(new Set(Object.keys(report))).toEqual(new Set(['T1-1', 'T1-2', 'T1-3', 'T1-4', 'T1-5', 'T1-6', 'T2-1', 'T2-2', 'T2-3', 'T2-4', 'T2-5', 'T2-6']))
})

test('get report byCategoryKey', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    await TestUtils.makeDraftChart(client, chartKey)

    const report = await client.chartReports.byCategoryKey(chartKey, undefined, Versions.draftVersion)

    expect(report['9'].length).toBe(17)
    expect(report['10'].length).toBe(17)
})

test('get report byCategoryLabel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    await TestUtils.makeDraftChart(client, chartKey)

    const report = await client.chartReports.byCategoryLabel(chartKey, undefined, Versions.draftVersion)

    expect(report.Cat1.length).toBe(17)
    expect(report.Cat2.length).toBe(17)
})

test('get report bySection', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithSections(chartKey, user.secretKey)
    await TestUtils.makeDraftChart(client, chartKey)

    const report = await client.chartReports.bySection(chartKey, undefined, Versions.draftVersion)

    expect(report['Section A'].length).toBe(36)
    expect(report['Section B'].length).toBe(35)
})
