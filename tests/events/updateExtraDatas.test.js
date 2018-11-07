const testUtils = require('../testUtils.js');

test('should update extra datas of an event', async () => {
    var chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);

    var extraData1 = {
        "foo1": "bar1"
    };

    var extraData2 = {
        "foo2": "bar2"
    };

    await client.events.updateExtraDatas(event.key, {'A-1': extraData1, 'A-2': extraData2});
    var objStatus1 = await client.events.retrieveObjectStatus(event.key, 'A-1');
    var objStatus2 = await client.events.retrieveObjectStatus(event.key, 'A-2');
    expect(objStatus1.extraData).toEqual(extraData1);
    expect(objStatus2.extraData).toEqual(extraData2);
});
