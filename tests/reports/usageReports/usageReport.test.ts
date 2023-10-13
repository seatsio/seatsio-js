import { TestUtils } from '../../testUtils'

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

function warnAboutDemoCompanySecretKeyNotSet () {
    console.warn('DEMO_COMPANY_SECRET_KEY environment variable not set, skipping test')
}
