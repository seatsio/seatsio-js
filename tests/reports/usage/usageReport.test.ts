import { TestUtils } from '../../testUtils.js'
import { Month } from '../../../src/Common/Month.js'
import { BillableRenderings } from '../../../src/Reports/BillableRenderings.js'
import { MonthlyBillableRenderings } from '../../../src/Reports/MonthlyBillableRenderings.js'

test('usage report for all months', async () => {
    if (!TestUtils.isDemoCompanySecretKeySet()) {
        return warnAboutDemoCompanySecretKeyNotSet()
    }

    const client = TestUtils.createClient(TestUtils.demoCompanySecretKey())

    const report = await client.usageReports.summaryForAllMonths()

    expect(report.usageCutoffDate).toBeTruthy()
    expect(report.usage.length).toBeGreaterThan(0)
    expect(report.usage[0].month).toEqual({ month: 2, year: 2014 })
})

test('usage report for month', async () => {
    if (!TestUtils.isDemoCompanySecretKeySet()) {
        return warnAboutDemoCompanySecretKeyNotSet()
    }

    const client = TestUtils.createClient(TestUtils.demoCompanySecretKey())

    const report = await client.usageReports.detailsForMonth('2021-11')

    expect(report.length).toBeGreaterThan(0)
    expect(report[0].usageByChart.length).toBeGreaterThan(0)
    expect(report[0].usageByChart[0].usageByEvent).toEqual([
        {
            numUsedObjects: 143,
            event: { deleted: false, id: 580293, key: 'largeStadiumEvent' }
        }
    ])
})

test('usage report for event in month', async () => {
    if (!TestUtils.isDemoCompanySecretKeySet()) {
        return warnAboutDemoCompanySecretKeyNotSet()
    }

    const client = TestUtils.createClient(TestUtils.demoCompanySecretKey())

    const report = await client.usageReports.detailsForEventInMonth(580293, '2021-11')

    expect(report.length).toBeGreaterThan(0)
    expect(report[0]).toEqual({
        numFirstSelections: 1,
        numFirstBookings: 0,
        numFirstBookingsOrSelections: 1,
        object: '102-9-14'
    })
})

test('billable rendering report for company', async () => {
    if (!TestUtils.isDemoCompanySecretKeySet()) {
        return warnAboutDemoCompanySecretKeyNotSet()
    }

    const client = TestUtils.createClient(TestUtils.demoCompanySecretKey())

    const report: BillableRenderings = await client.usageReports.billableRenderingsSummaryForAllMonths()

    expect(report.companyId).toBeTruthy()
    expect(Object.keys(report.usage).length).toBeGreaterThan(0)

    const firstMonthKey = Object.keys(report.usage)[0]
    const firstMonth = report.usage[firstMonthKey]
    expect(firstMonth.month).toBeInstanceOf(Month)
    expect(Object.keys(firstMonth.usage).length).toBeGreaterThan(0)

    const firstWorkspaceKey = Object.keys(firstMonth.usage)[0]
    const firstWorkspace = firstMonth.usage[firstWorkspaceKey]
    expect(firstWorkspace.workspaceKey).toBeTruthy()
    expect(firstWorkspace.workspaceId).toBeTruthy()
    expect(Object.keys(firstWorkspace.usage).length).toBeGreaterThan(0)

    const firstChartKey = Object.keys(firstWorkspace.usage)[0]
    const firstChart = firstWorkspace.usage[firstChartKey]
    expect(firstChart.chartKey).toBeTruthy()
    expect(firstChart.numBillableRenderings).toBeGreaterThan(0)
})

test('billable rendering report for company in month', async () => {
    if (!TestUtils.isDemoCompanySecretKeySet()) {
        return warnAboutDemoCompanySecretKeyNotSet()
    }

    const client = TestUtils.createClient(TestUtils.demoCompanySecretKey())

    const report: MonthlyBillableRenderings = await client.usageReports.billableRenderingsSummaryForMonth(new Month(2026, 6))

    expect(report.companyId).toBeTruthy()
    expect(report.month).toBeInstanceOf(Month)
    expect(Object.keys(report.usage).length).toBeGreaterThan(0)

    const firstWorkspaceKey = Object.keys(report.usage)[0]
    const firstWorkspace = report.usage[firstWorkspaceKey]
    expect(firstWorkspace.workspaceKey).toBeTruthy()
    expect(firstWorkspace.workspaceId).toBeTruthy()
    expect(Object.keys(firstWorkspace.usage).length).toBeGreaterThan(0)

    const firstChartKey = Object.keys(firstWorkspace.usage)[0]
    const firstChart = firstWorkspace.usage[firstChartKey]
    expect(firstChart.chartKey).toBeTruthy()
    expect(firstChart.numBillableRenderings).toBeGreaterThanOrEqual(0)
})

function warnAboutDemoCompanySecretKeyNotSet () {
    console.warn('DEMO_COMPANY_SECRET_KEY environment variable not set, skipping test')
}
