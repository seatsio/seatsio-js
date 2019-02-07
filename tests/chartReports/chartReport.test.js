const testUtils = require('../testUtils.js')

test('chart report properties', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)

  let report = await client.chartReports.byLabel(chartKey)

  let reportItem = report['A-1'][0]
  expect(reportItem.label).toBe('A-1')
  expect(reportItem.labels).toEqual(testUtils.someLabels('1', 'seat', 'A', 'row'))
  expect(reportItem.categoryLabel).toBe('Cat1')
  expect(reportItem.categoryKey).toBe('9')
  expect(reportItem.objectType).toBe('seat')
  expect(reportItem.section).toBeFalsy()
  expect(reportItem.entrance).toBeFalsy()
})

test('chart report properties for GA', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)

  let report = await client.chartReports.byLabel(chartKey)

  let reportItem = report['GA1'][0]
  expect(reportItem.capacity).toBe(100)
  expect(reportItem.objectType).toBe('generalAdmission')
})

test('byLabel method for Reports module', async () => {
  let user = await testUtils.createTestUser()
  let client = testUtils.createClient(user.secretKey)
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)

  let report = await client.chartReports.byLabel(chartKey)

  expect(report['A-1'].length).toBe(1)
  expect(report['A-2'].length).toBe(1)
})
