const testUtils = require('../testUtils.js');

test('chart report properties', async () => {
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);

    var report = await client.chartReports.byLabel(chartKey);
    var reportItem = report['A-1'][0];

    expect(reportItem.label).toBe('A-1');
    expect(reportItem.labels).toEqual(testUtils.someLabels('1', 'seat', 'A', 'row'));
    expect(reportItem.categoryLabel).toBe('Cat1');
    expect(reportItem.categoryKey).toBe('9');
    expect(reportItem.objectType).toBe('seat');
    expect(reportItem.section).toBeUndefined();
    expect(reportItem.entrance).toBeUndefined();
});

test('chart report properties for GA', async () => {
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);

    var report = await client.chartReports.byLabel(chartKey);
    var reportItem = report['GA1'][0];

    expect(reportItem.capacity).toBe(100);
    expect(reportItem.objectType).toBe('generalAdmission');
});

test('byLabel method for Reports module', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);

    var report = await client.chartReports.byLabel(chartKey);

    expect(report['A-1'].length).toBe(1);
    expect(report['A-2'].length).toBe(1);
});
