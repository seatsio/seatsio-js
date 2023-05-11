// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
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
