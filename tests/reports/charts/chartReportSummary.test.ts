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
                byCategoryLabel: { Cat1: 16, Cat2: 16 },
                byZone: { NO_ZONE: 32 }
            },
            generalAdmission: {
                count: 200,
                bySection: { NO_SECTION: 200 },
                byCategoryKey: { 9: 100, 10: 100 },
                byCategoryLabel: { Cat2: 100, Cat1: 100 },
                byZone: { NO_ZONE: 200 }
            },
            table: {
                count: 0,
                bySection: {},
                byCategoryKey: {},
                byCategoryLabel: {},
                byZone: {}
            },
            booth: {
                count: 0,
                bySection: {},
                byCategoryKey: {},
                byCategoryLabel: {},
                byZone: {}
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
                byCategoryLabel: {},
                byZone: {}
            },
            generalAdmission: {
                count: 0,
                bySection: {},
                byCategoryKey: {},
                byCategoryLabel: {},
                byZone: {}
            },
            table: {
                count: 2,
                bySection: { NO_SECTION: 2 },
                byCategoryKey: { 9: 2 },
                byCategoryLabel: { Cat1: 2 },
                byZone: { NO_ZONE: 2 }
            },
            booth: {
                count: 0,
                bySection: {},
                byCategoryKey: {},
                byCategoryLabel: {},
                byZone: {}
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
                },
                byZone: { NO_ZONE: 116 }
            },
            10: {
                count: 116,
                bySection: { NO_SECTION: 116 },
                byObjectType: {
                    generalAdmission: 100,
                    seat: 16
                },
                byZone: { NO_ZONE: 116 }
            },
            string11: {
                count: 0,
                bySection: {},
                byObjectType: {},
                byZone: {}
            },
            NO_CATEGORY: {
                count: 0,
                bySection: {},
                byObjectType: {},
                byZone: {}
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
                },
                byZone: { NO_ZONE: 116 }
            },
            Cat1: {
                count: 116,
                bySection: { NO_SECTION: 116 },
                byObjectType: {
                    generalAdmission: 100,
                    seat: 16
                },
                byZone: { NO_ZONE: 116 }
            },
            Cat3: {
                count: 0,
                bySection: {},
                byObjectType: {},
                byZone: {}
            },
            NO_CATEGORY: {
                count: 0,
                bySection: {},
                byObjectType: {},
                byZone: {}
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
                },
                byZone: { NO_ZONE: 232 }
            }
        })
    })
})

describe('summaryByZone', () => {
    it.each([
        [
            'published',
            () => { return Promise },
            (client: SeatsioClient, chartKey: string) => client.chartReports.summaryByZone(chartKey)
        ],
        [
            'draft',
            (client: SeatsioClient, chartKey: string) => { return TestUtils.makeDraftChart(client, chartKey) },
            (client: SeatsioClient, chartKey: string) => client.chartReports.summaryByZone(chartKey, 'true', Versions.draftVersion)
        ]
    ])(' for %s chart', async (version, updateChart, getReport) => {
        const { client, user } = await TestUtils.createTestUserAndClient()
        const chartKey = TestUtils.getChartKey()
        await TestUtils.createTestChartWithZones(chartKey, user.secretKey)
        await updateChart(client, chartKey)

        const report = await getReport(client, chartKey)

        expect(report).toEqual({
            midtrack: {
                count: 6032,
                byCategoryKey: { 2: 6032 },
                byCategoryLabel: { 'Mid Track Stand': 6032 },
                byObjectType: {
                    seat: 6032
                },
                bySection: { MT1: 2418, MT3: 3614 }
            },
            finishline: {
                count: 2865,
                byCategoryKey: { 1: 2865 },
                byCategoryLabel: { 'Goal Stands': 2865 },
                byObjectType: {
                    seat: 2865
                },
                bySection: { 'Goal Stand 3': 2215, 'Goal Stand 4': 650 }
            },
            NO_ZONE: {
                count: 0,
                byCategoryKey: {},
                byCategoryLabel: {},
                byObjectType: {},
                bySection: {}
            }
        })
    })
})
