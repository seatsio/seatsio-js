import { TestUtils } from '../TestUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should update extra datas of an event', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const extraData1 = { foo1: 'bar1' }; const extraData2 = { foo2: 'bar2' }

    await client.events.updateExtraDatas(event.key, { 'A-1': extraData1, 'A-2': extraData2 })

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo1.extraData).toEqual(extraData1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo2.extraData).toEqual(extraData2)
})
