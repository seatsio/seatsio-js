import { TestUtils } from '../../testUtils'
import { IDs } from '../../../src/Common/IDs'
import { ChartObjectInfo } from '../../../src/Charts/ChartObjectInfo'
import { Dict } from '../../../src/Dict'
import { SeatsioClient } from '../../../src/SeatsioClient'
import { Versions } from '../../../src/Reports/ChartReports'

describe('chart report properties', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey)
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey, undefined, Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChart(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report: Dict<ChartObjectInfo[]> = await getReport(client, chartKey)

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
})

describe('chart report properties for GA', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey)
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey, undefined, Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChart(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        const reportItem = report.GA1[0]
        expect(reportItem.capacity).toBe(100)
        expect(reportItem.objectType).toBe('generalAdmission')
        expect(reportItem.bookAsAWhole).toBe(false)
    })
})

describe('chart report properties for table', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey, 'true')
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey, 'true', Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        const reportItem = report.T1[0]
        expect(reportItem.numSeats).toBe(6)
        expect(reportItem.bookAsAWhole).toBe(false)
    })
})

describe('get report byLabel', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey)
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey, undefined, Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChart(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(report['A-1'].length).toBe(1)
        expect(report['A-2'].length).toBe(1)
    })
})

describe('get report byObjectType', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byObjectType(chartKey)
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byObjectType(chartKey, undefined, Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChart(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(report.seat.length).toBe(32)
        expect(report.generalAdmission.length).toBe(2)
    })
})

describe('get report byLabel, bookWholeTables not passed in', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey)
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey, undefined, Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(new Set(Object.keys(report))).toEqual(new Set(['T1-1', 'T1-2', 'T1-3', 'T1-4', 'T1-5', 'T1-6', 'T2-1', 'T2-2', 'T2-3', 'T2-4', 'T2-5', 'T2-6', 'T1', 'T2']))
    })
})

describe('get report byLabel, bookWholeTables chart', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey, 'chart')
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey, 'chart', Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(new Set(Object.keys(report))).toEqual(new Set(['T1-1', 'T1-2', 'T1-3', 'T1-4', 'T1-5', 'T1-6', 'T2']))
    })
})

describe('get report byLabel, bookWholeTables true', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey, 'true')
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey, 'true', Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(new Set(Object.keys(report))).toEqual(new Set(['T1', 'T2']))
    })
})

describe('get report byLabel, bookWholeTables false', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey, 'false')
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byLabel(chartKey, 'false', Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(new Set(Object.keys(report))).toEqual(new Set(['T1-1', 'T1-2', 'T1-3', 'T1-4', 'T1-5', 'T1-6', 'T2-1', 'T2-2', 'T2-3', 'T2-4', 'T2-5', 'T2-6']))
    })
})

describe('get report byCategoryKey', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byCategoryKey(chartKey)
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byCategoryKey(chartKey, undefined, Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChart(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(report['9'].length).toBe(17)
        expect(report['10'].length).toBe(17)
    })
})

describe('get report byCategoryLabel', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byCategoryLabel(chartKey)
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.byCategoryLabel(chartKey, undefined, Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChart(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(report.Cat1.length).toBe(17)
        expect(report.Cat2.length).toBe(17)
    })
})

describe('get report bySection', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.bySection(chartKey)
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.bySection(chartKey, undefined, Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChartWithSections(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(report['Section A'].length).toBe(36)
        expect(report['Section B'].length).toBe(35)
    })
})
