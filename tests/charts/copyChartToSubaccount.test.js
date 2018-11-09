const testUtils = require('../testUtils.js');

test('should copy to subaccount', async () => {
    let subaccount = await client.subaccounts.create();
    let subaccountClient = testUtils.createClient(subaccount.secretKey, testUtils.baseUrl);
    let chart = await client.charts.create('My chart');

    let copiedChart = await client.charts.copyToSubaccount(chart.key, subaccount.id);

    let retrievedChart = await subaccountClient.charts.retrieve(copiedChart.key);
    expect(copiedChart.name).toEqual('My chart');
    expect(copiedChart.key).not.toBe(chart.key);
    expect(retrievedChart.name).toEqual('My chart');
});
