const testUtils = require('../testUtils.js')

test('should validate published version of a chart', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    await client.accounts.updateSetting('VALIDATE_DUPLICATE_LABELS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECTS_WITHOUT_CATEGORIES', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_UNLABELED_OBJECTS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_FOCAL_POINT', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECT_TYPES_PER_CATEGORY', 'WARNING')
    const chartKey = testUtils.getChartKey()
    await testUtils.createErroneousTestChart(chartKey, user.secretKey)
    await client.events.create(chartKey)

    const validationRes = await client.charts.validatePublishedVersion(chartKey)

    expect(validationRes.errors).toEqual([])
    expect(validationRes.warnings).toContain('VALIDATE_DUPLICATE_LABELS')
    expect(validationRes.warnings).toContain('VALIDATE_OBJECTS_WITHOUT_CATEGORIES')
    expect(validationRes.warnings).toContain('VALIDATE_UNLABELED_OBJECTS')
    expect(validationRes.warnings).toContain('VALIDATE_FOCAL_POINT')
    expect(validationRes.warnings).toContain('VALIDATE_OBJECT_TYPES_PER_CATEGORY')
})

test('should validate published version of a chart with different validation settings', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    await client.accounts.updateSetting('VALIDATE_DUPLICATE_LABELS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_FOCAL_POINT', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECT_TYPES_PER_CATEGORY', 'OFF')
    const chartKey = testUtils.getChartKey()
    await testUtils.createErroneousTestChart(chartKey, user.secretKey)

    const validationRes = await client.charts.validatePublishedVersion(chartKey)

    expect(validationRes.warnings).toContain('VALIDATE_FOCAL_POINT')
    expect(validationRes.warnings).toContain('VALIDATE_DUPLICATE_LABELS')
    expect(validationRes.warnings).not.toContain('VALIDATE_OBJECT_TYPES_PER_CATEGORY')
    expect(validationRes.errors).toEqual([])
})

test('should validate draft version of a chart', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    await client.accounts.updateSetting('VALIDATE_DUPLICATE_LABELS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECTS_WITHOUT_CATEGORIES', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_UNLABELED_OBJECTS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_FOCAL_POINT', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECT_TYPES_PER_CATEGORY', 'WARNING')
    const chartKey = testUtils.getChartKey()
    await testUtils.createErroneousTestChart(chartKey, user.secretKey)
    await client.events.create(chartKey)
    await client.charts.update(chartKey, 'New name')

    const validationRes = await client.charts.validateDraftVersion(chartKey)

    expect(validationRes.errors).toEqual([])
    expect(validationRes.warnings).toContain('VALIDATE_DUPLICATE_LABELS')
    expect(validationRes.warnings).toContain('VALIDATE_OBJECTS_WITHOUT_CATEGORIES')
    expect(validationRes.warnings).toContain('VALIDATE_UNLABELED_OBJECTS')
    expect(validationRes.warnings).toContain('VALIDATE_FOCAL_POINT')
    expect(validationRes.warnings).toContain('VALIDATE_OBJECT_TYPES_PER_CATEGORY')
})
