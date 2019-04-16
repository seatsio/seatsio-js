let testUtils = require('../testUtils.js')

test('should validate published version of a chart', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createErroneousTestChart(chartKey, user.designerKey)

  let validationRes = await client.charts.validatePublishedVersion(chartKey)

  expect(validationRes.errors.length).toBe(3)
  expect(validationRes.warnings.length).toBe(0)
  expect(validationRes.errors).toContain('VALIDATE_DUPLICATE_LABELS')
  expect(validationRes.errors).toContain('VALIDATE_OBJECTS_WITHOUT_CATEGORIES')
  expect(validationRes.errors).toContain('VALIDATE_UNLABELED_OBJECTS')
})
