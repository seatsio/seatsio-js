let testUtils = require('../testUtils.js')

test('should validate published version of a chart', async () => {
    await client.accounts.updateSetting('VALIDATE_DUPLICATE_LABELS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECTS_WITHOUT_CATEGORIES', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_UNLABELED_OBJECTS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_FOCAL_POINT', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECT_TYPES_PER_CATEGORY', 'WARNING')
    let chartKey = testUtils.getChartKey()
    await testUtils.createErroneousTestChart(chartKey, user.designerKey)
    await client.events.create(chartKey)

    let validationRes = await client.charts.validatePublishedVersion(chartKey)

    expect(validationRes.errors).toEqual([])
    expect(validationRes.warnings).toContain('VALIDATE_DUPLICATE_LABELS')
    expect(validationRes.warnings).toContain('VALIDATE_OBJECTS_WITHOUT_CATEGORIES')
    expect(validationRes.warnings).toContain('VALIDATE_UNLABELED_OBJECTS')
    expect(validationRes.warnings).toContain('VALIDATE_FOCAL_POINT')
    expect(validationRes.warnings).toContain('VALIDATE_OBJECT_TYPES_PER_CATEGORY')
})

test('should validate published version of a chart with different validation settings', async () => {
    await client.accounts.updateSetting('VALIDATE_DUPLICATE_LABELS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_FOCAL_POINT', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECT_TYPES_PER_CATEGORY', 'OFF')
    let chartKey = testUtils.getChartKey()
    await testUtils.createErroneousTestChart(chartKey, user.designerKey)

    let validationRes = await client.charts.validatePublishedVersion(chartKey)

    expect(validationRes.warnings).toContain('VALIDATE_FOCAL_POINT')
    expect(validationRes.warnings).toContain('VALIDATE_DUPLICATE_LABELS')
    expect(validationRes.warnings).not.toContain('VALIDATE_OBJECT_TYPES_PER_CATEGORY')
    expect(validationRes.errors).toContain('VALIDATE_UNLABELED_OBJECTS')
    expect(validationRes.errors).toContain('VALIDATE_OBJECTS_WITHOUT_CATEGORIES')
    expect(validationRes.errors).not.toContain('VALIDATE_OBJECT_TYPES_PER_CATEGORY')
})

test('should validate draft version of a chart', async () => {
    await client.accounts.updateSetting('VALIDATE_DUPLICATE_LABELS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECTS_WITHOUT_CATEGORIES', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_UNLABELED_OBJECTS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_FOCAL_POINT', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECT_TYPES_PER_CATEGORY', 'WARNING')
    let chartKey = testUtils.getChartKey()
    await testUtils.createErroneousTestChart(chartKey, user.designerKey)
    await client.events.create(chartKey)
    await client.charts.update(chartKey, 'New name')

    let validationRes = await client.charts.validateDraftVersion(chartKey)

    expect(validationRes.errors).toEqual([])
    expect(validationRes.warnings).toContain('VALIDATE_DUPLICATE_LABELS')
    expect(validationRes.warnings).toContain('VALIDATE_OBJECTS_WITHOUT_CATEGORIES')
    expect(validationRes.warnings).toContain('VALIDATE_UNLABELED_OBJECTS')
    expect(validationRes.warnings).toContain('VALIDATE_FOCAL_POINT')
    expect(validationRes.warnings).toContain('VALIDATE_OBJECT_TYPES_PER_CATEGORY')
})
