const testUtils = require('../testUtils.js');

test('should archive a chart', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chart = await client.charts.create();
    await client.charts.moveToArchive(chart.key);
    var retrievedCart = await client.charts.retrieve(chart.key);
    expect(retrievedCart.archived).toBe(true);
});
