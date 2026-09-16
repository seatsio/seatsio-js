import { TestUtils } from '../testUtils.js'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo.js'
import { AreaTypes } from '../../src/Common/AreaType.js'

test('should retrieve event object info', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')

    expect(objectInfo.status).toEqual(EventObjectInfo.FREE)
    expect(objectInfo.ticketType).toBeUndefined()
    expect(objectInfo.extraData).toBeUndefined()
    expect(objectInfo.forSale).toBe(true)
    expect(objectInfo.areaType).toBeUndefined()
})

test('should retrieve area type of a GA area', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'GA1')

    expect(objectInfo.areaType).toBe(AreaTypes.GENERAL_ADMISSION)
})
