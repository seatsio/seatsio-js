const testUtils = require('../testUtils.js')

test('should update extra datas of an event', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const extraData1 = { foo1: 'bar1' }; const extraData2 = { foo2: 'bar2' }

    await client.events.updateExtraDatas(event.key, { 'A-1': extraData1, 'A-2': extraData2 })

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    expect(objectInfo1.extraData).toEqual(extraData1)
    expect(objectInfo2.extraData).toEqual(extraData2)
})
