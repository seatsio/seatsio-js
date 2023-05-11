// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'
import Axios from 'axios'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should delete an event', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.delete(event.key)

    const retrieveFail = await client.events.retrieve(event.key).catch((err: any) => err)
    Axios.interceptors.request.eject(client.errInterceptor)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrieveFail.status).toBe(404)
})
