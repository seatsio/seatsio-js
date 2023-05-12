import { TestUtils } from '../testUtils'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo'

test('should retrieve event object info', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')

    expect(objectInfo.status).toEqual(EventObjectInfo.FREE)
    expect(objectInfo.ticketType).toBeFalsy()
    expect(objectInfo.extraData).toBeFalsy()
    expect(objectInfo.forSale).toBe(true)
})
