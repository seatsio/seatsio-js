import { TestUtils } from '../TestUtils'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo.js'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should retrieve event object info', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.status).toEqual(EventObjectInfo.FREE)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.ticketType).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.extraData).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.forSale).toBe(true)
})
