import { TestUtils } from '../TestUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('summaryByObjectType', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.summaryByObjectType(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
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

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('summaryByObjectType_bookWholeTablesTrue', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)

    const report = await client.chartReports.summaryByObjectType(chartKey, 'true')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
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

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('summaryByCategoryKey', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.summaryByCategoryKey(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
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

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('summaryByCategoryLabel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.summaryByCategoryLabel(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
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

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('summaryBySection', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.summaryBySection(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
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
