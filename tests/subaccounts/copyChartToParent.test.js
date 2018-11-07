const testUtils = require('../testUtils.js');

test('should copy chart to parent', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var subaccount = await client.subaccounts.create();
    var chart = await testUtils.createClient(subaccount.secretKey, testUtils.baseUrl).charts.create('aChart');
    var copiedChart = await client.subaccounts.copyChartToParent(subaccount.id, chart.key);
    var retrievedChart = await client.charts.retrieve(copiedChart.key);

    expect(copiedChart.name).toBe('aChart');
    expect(retrievedChart.name).toBe('aChart');
});
