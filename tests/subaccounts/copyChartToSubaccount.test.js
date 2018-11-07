const testUtils = require('../testUtils.js');

test('should copy chart to subaccount', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var fromSubaccount = await client.subaccounts.create();
    var toSubaccount = await client.subaccounts.create();
    var chart = await testUtils.createClient(fromSubaccount.secretKey, testUtils.baseUrl)
        .charts.create('aChart');
    var copiedChart = await client.subaccounts.copyChartToSubaccount(fromSubaccount.id, toSubaccount.id, chart.key);
    var retrievedChart = await testUtils.createClient(toSubaccount.secretKey, testUtils.baseUrl)
        .charts.retrieve(copiedChart.key);

    expect(copiedChart.name).toBe('aChart');
    expect(retrievedChart.name).toBe('aChart');
});
