const testUtils = require('../testUtils.js')

test('summaryByObjectType', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.summaryByObjectType(chartKey)

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

test('summaryByObjectType_bookWholeTablesTrue', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)

    const report = await client.chartReports.summaryByObjectType(chartKey, 'true')

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

test('summaryByCategoryKey', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.summaryByCategoryKey(chartKey)

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
        'string11': {
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

test('summaryByCategoryLabel', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.summaryByCategoryLabel(chartKey)

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

test('summaryBySection', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.summaryBySection(chartKey)

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
