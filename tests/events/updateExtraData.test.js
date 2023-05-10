import { TestUtils } from '../TestUtils'

test('should update extra data of an event', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const extraData = { foo: 'bar' }

    await client.events.updateExtraData(event.key, 'A-1', extraData)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(objectInfo.extraData).toEqual(extraData)
})
