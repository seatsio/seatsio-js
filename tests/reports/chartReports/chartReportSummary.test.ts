import { TestUtils } from '../../testUtils'
import { SeatsioClient } from '../../../src/SeatsioClient'
import { Versions } from '../../../src/Reports/ChartReports'

describe('summaryByObjectType', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.summaryByObjectType(chartKey)
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.summaryByObjectType(chartKey, undefined, Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChart(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(report).toEqual({
            seat: {
                count: 32,
                bySection: { NO_SECTION: 32 },
                byCategoryKey: { 9: 16, 10: 16 },
                byCategoryLabel: { Cat1: 16, Cat2: 16 }
            },
            generalAdmission: {
                count: 200,
                bySection: { NO_SECTION: 200 },
                byCategoryKey: { 9: 100, 10: 100 },
                byCategoryLabel: { Cat2: 100, Cat1: 100 }
            },
            table: {
                count: 0,
                bySection: {},
                byCategoryKey: {},
                byCategoryLabel: {}
            },
            booth: {
                count: 0,
                bySection: {},
                byCategoryKey: {},
                byCategoryLabel: {}
            }
        })
    })
})

describe('summaryByObjectType_bookWholeTablesTrue', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.summaryByObjectType(chartKey, 'true')
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.summaryByObjectType(chartKey, 'true', Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(report).toEqual({
            seat: {
                count: 0,
                bySection: {},
                byCategoryKey: {},
                byCategoryLabel: {}
            },
            generalAdmission: {
                count: 0,
                bySection: {},
                byCategoryKey: {},
                byCategoryLabel: {}
            },
            table: {
                count: 2,
                bySection: { NO_SECTION: 2 },
                byCategoryKey: { 9: 2 },
                byCategoryLabel: { Cat1: 2 }
            },
            booth: {
                count: 0,
                bySection: {},
                byCategoryKey: {},
                byCategoryLabel: {}
            }
        })
    })
})

describe('summaryByCategoryKey', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.summaryByCategoryKey(chartKey)
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.summaryByCategoryKey(chartKey, 'true', Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChart(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(report).toEqual({
            9: {
                count: 116,
                bySection: { NO_SECTION: 116 },
                byObjectType: {
                    generalAdmission: 100,
                    seat: 16
                }
            },
            10: {
                count: 116,
                bySection: { NO_SECTION: 116 },
                byObjectType: {
                    generalAdmission: 100,
                    seat: 16
                }
            },
            string11: {
                count: 0,
                bySection: {},
                byObjectType: {}
            },
            NO_CATEGORY: {
                count: 0,
                bySection: {},
                byObjectType: {}
            }
        })
    })
})

describe('summaryByCategoryLabel', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.summaryByCategoryLabel(chartKey)
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.summaryByCategoryLabel(chartKey, 'true', Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChart(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(report).toEqual({
            Cat2: {
                count: 116,
                bySection: { NO_SECTION: 116 },
                byObjectType: {
                    generalAdmission: 100,
                    seat: 16
                }
            },
            Cat1: {
                count: 116,
                bySection: { NO_SECTION: 116 },
                byObjectType: {
                    generalAdmission: 100,
                    seat: 16
                }
            },
            Cat3: {
                count: 0,
                bySection: {},
                byObjectType: {}
            },
            NO_CATEGORY: {
                count: 0,
                bySection: {},
                byObjectType: {}
            }
        })
    })
})

describe('summaryBySection', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.summaryBySection(chartKey)
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.summaryBySection(chartKey, 'true', Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChart(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(report).toEqual({
            NO_SECTION: {
                count: 232,
                byCategoryKey: { 9: 116, 10: 116 },
                byCategoryLabel: { Cat2: 116, Cat1: 116 },
                byObjectType: {
                    generalAdmission: 200,
                    seat: 32
                }
            }
        })
    })
})
