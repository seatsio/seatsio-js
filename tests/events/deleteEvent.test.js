const testUtils = require('../testUtils.js');
const axios = require('axios');

test('should delete an event', async () => {
    var user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chart = await client.charts.create();
    var event = await client.events.create(chart.key);
    await client.events.delete(event.key);
    var retrieveFail = await client.events.retrieve(event.key).catch(err => err);
    axios.interceptors.request.eject(client.errInterceptor);
    expect(retrieveFail.status).toBe(404);
});
