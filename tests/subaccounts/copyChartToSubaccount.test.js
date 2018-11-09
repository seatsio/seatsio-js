const testUtils = require('../testUtils.js');

test('should copy chart to subaccount', async () => {
    let fromSubaccount = await client.subaccounts.create();
    let toSubaccount = await client.subaccounts.create();
    let chart = await testUtils.createClient(fromSubaccount.secretKey, testUtils.baseUrl)
        .charts.create('aChart');

    let copiedChart = await client.subaccounts.copyChartToSubaccount(fromSubaccount.id, toSubaccount.id, chart.key);

    let retrievedChart = await testUtils.createClient(toSubaccount.secretKey, testUtils.baseUrl)
        .charts.retrieve(copiedChart.key);
    expect(copiedChart.name).toBe('aChart');
    expect(retrievedChart.name).toBe('aChart');
});
