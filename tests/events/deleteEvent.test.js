const axios = require('axios')
const testUtils = require('../testUtils.js')

test('should delete an event', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.delete(event.key)

    const retrieveFail = await client.events.retrieve(event.key).catch(err => err)
    axios.interceptors.request.eject(client.errInterceptor)
    expect(retrieveFail.status).toBe(404)
})
