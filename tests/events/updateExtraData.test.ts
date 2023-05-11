import { TestUtils } from '../TestUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should update extra data of an event', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const extraData = { foo: 'bar' }

    await client.events.updateExtraData(event.key, 'A-1', extraData)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo.extraData).toEqual(extraData)
})
