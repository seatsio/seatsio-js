const axios = require('axios');

test('should delete an event', async () => {
    let chart = await client.charts.create();
    let event = await client.events.create(chart.key);
    await client.events.delete(event.key);
    let retrieveFail = await client.events.retrieve(event.key).catch(err => err);
    axios.interceptors.request.eject(client.errInterceptor);
    expect(retrieveFail.status).toBe(404);
});
