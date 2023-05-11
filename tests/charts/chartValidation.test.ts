// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should validate published version of a chart', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    await client.accounts.updateSetting('VALIDATE_DUPLICATE_LABELS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECTS_WITHOUT_CATEGORIES', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_UNLABELED_OBJECTS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_FOCAL_POINT', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECT_TYPES_PER_CATEGORY', 'WARNING')
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createErroneousTestChart(chartKey, user.secretKey)
    await client.events.create(chartKey)

    const validationRes = await client.charts.validatePublishedVersion(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.errors).toEqual([])
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.warnings).toContain('VALIDATE_DUPLICATE_LABELS')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.warnings).toContain('VALIDATE_OBJECTS_WITHOUT_CATEGORIES')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.warnings).toContain('VALIDATE_UNLABELED_OBJECTS')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.warnings).toContain('VALIDATE_FOCAL_POINT')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.warnings).toContain('VALIDATE_OBJECT_TYPES_PER_CATEGORY')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should validate published version of a chart with different validation settings', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    await client.accounts.updateSetting('VALIDATE_DUPLICATE_LABELS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_FOCAL_POINT', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECT_TYPES_PER_CATEGORY', 'OFF')
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createErroneousTestChart(chartKey, user.secretKey)

    const validationRes = await client.charts.validatePublishedVersion(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.warnings).toContain('VALIDATE_FOCAL_POINT')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.warnings).toContain('VALIDATE_DUPLICATE_LABELS')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.warnings).not.toContain('VALIDATE_OBJECT_TYPES_PER_CATEGORY')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.errors).toEqual([])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should validate draft version of a chart', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    await client.accounts.updateSetting('VALIDATE_DUPLICATE_LABELS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECTS_WITHOUT_CATEGORIES', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_UNLABELED_OBJECTS', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_FOCAL_POINT', 'WARNING')
    await client.accounts.updateSetting('VALIDATE_OBJECT_TYPES_PER_CATEGORY', 'WARNING')
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createErroneousTestChart(chartKey, user.secretKey)
    await client.events.create(chartKey)
    await client.charts.update(chartKey, 'New name')

    const validationRes = await client.charts.validateDraftVersion(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.errors).toEqual([])
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.warnings).toContain('VALIDATE_DUPLICATE_LABELS')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.warnings).toContain('VALIDATE_OBJECTS_WITHOUT_CATEGORIES')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.warnings).toContain('VALIDATE_UNLABELED_OBJECTS')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.warnings).toContain('VALIDATE_FOCAL_POINT')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(validationRes.warnings).toContain('VALIDATE_OBJECT_TYPES_PER_CATEGORY')
})
