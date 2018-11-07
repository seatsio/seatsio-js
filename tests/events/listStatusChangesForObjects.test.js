const testUtils = require('../testUtils.js');

test('should list status changes for objects', async () => {
    var chartKey = testUtils.getChartKey();
    var chart = await testUtils.createTestChart(chartKey, user.designerKey);
    var event = await client.events.create(chartKey);
    await client.events.changeObjectStatus(event.key, 'A-1', 's1');
    await client.events.changeObjectStatus(event.key, 'A-1', 's2');
    await client.events.changeObjectStatus(event.key, 'A-2', 's4');
    await client.events.changeObjectStatus(event.key, 'A-1', 's3');

    var statusChangesPage = await client.events.statusChanges(event.key, 'A-1').all();
    var statuses = [];
    for (let item of statusChangesPage) {
        statuses.push(item.status);
    }

    expect(statuses).toContain('s1');
    expect(statuses).toContain('s2');
    expect(statuses).toContain('s3');
    expect(statuses).not.toContain('s4');

});
