const testUtils = require('../testUtils.js')

test('chart report properties', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.byLabel(chartKey)

    const reportItem = report['A-1'][0]
    expect(reportItem.label).toBe('A-1')
    expect(reportItem.labels).toEqual(testUtils.someLabels('1', 'seat', 'A', 'row'))
    expect(reportItem.categoryLabel).toBe('Cat1')
    expect(reportItem.categoryKey).toBe('9')
    expect(reportItem.objectType).toBe('seat')
    expect(reportItem.section).toBeFalsy()
    expect(reportItem.entrance).toBeFalsy()
    expect(reportItem.leftNeighbour).toBe(undefined)
    expect(reportItem.rightNeighbour).toBe('A-2')
})

test('chart report properties for GA', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.byLabel(chartKey)

    const reportItem = report.GA1[0]
    expect(reportItem.capacity).toBe(100)
    expect(reportItem.objectType).toBe('generalAdmission')
})

test('byLabel method for Reports module', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.byLabel(chartKey)

    expect(report['A-1'].length).toBe(1)
    expect(report['A-2'].length).toBe(1)
})

test('get reports byCategoryKey', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.byCategoryKey(chartKey)

    expect(report['9'].length).toBe(17)
    expect(report['10'].length).toBe(17)
})

test('get reports byCategoryLabel', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const report = await client.chartReports.byCategoryLabel(chartKey)

    expect(report.Cat1.length).toBe(17)
    expect(report.Cat2.length).toBe(17)
})
