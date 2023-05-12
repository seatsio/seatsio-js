import { TestUtils } from '../testUtils'
import Axios from 'axios'

test('should delete an event', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.delete(event.key)

    const retrieveFail = await client.events.retrieve(event.key).catch((err: any) => err)
    Axios.interceptors.request.eject(client.errInterceptor)
        expect(retrieveFail.status).toBe(404)
})
