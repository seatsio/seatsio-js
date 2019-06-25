const testUtils = require('../testUtils.js')

test('should update extra datas of an event', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.designerKey)
    let event = await client.events.create(chartKey)
    let extraData1 = { 'foo1': 'bar1' }; let extraData2 = { 'foo2': 'bar2' }

    await client.events.updateExtraDatas(event.key, { 'A-1': extraData1, 'A-2': extraData2 })

    let objStatus1 = await client.events.retrieveObjectStatus(event.key, 'A-1')
    let objStatus2 = await client.events.retrieveObjectStatus(event.key, 'A-2')
    expect(objStatus1.extraData).toEqual(extraData1)
    expect(objStatus2.extraData).toEqual(extraData2)
})
