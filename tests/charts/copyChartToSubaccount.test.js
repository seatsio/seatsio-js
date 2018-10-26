const testUtils = require('../testUtils.js');

test('should copy to subaccount', async ()=> {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var subaccount = await client.subaccounts.create();
  var subaccountClient = testUtils.createClient(subaccount.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create('My chart');
  var copiedChart = await client.charts.copyToSubaccount(chart.key, subaccount.id);
  var retrievedChart = await subaccountClient.charts.retrieve(copiedChart.key);

  expect(copiedChart.name).toEqual('My chart');
  expect(copiedChart.key).not.toBe(chart.key);
  expect(retrievedChart.name).toEqual('My chart');
});
