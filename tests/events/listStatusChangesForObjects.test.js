const testUtils = require('../testUtils.js');

test('should list status changes for objects', async () => {
    let chartKey = testUtils.getChartKey();
    let chart = await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.changeObjectStatus(event.key, 'A-1', 's1');
    await client.events.changeObjectStatus(event.key, 'A-1', 's2');
    await client.events.changeObjectStatus(event.key, 'A-2', 's4');
    await client.events.changeObjectStatus(event.key, 'A-1', 's3');
    let statuses = [];

    let statusChanges = client.events.statusChanges(event.key, 'A-1');
    for await (let statusChange of statusChanges) {
        statuses.push(statusChange.status);
    }

    expect(statuses).toContain('s1');
    expect(statuses).toContain('s2');
    expect(statuses).toContain('s3');
    expect(statuses).not.toContain('s4');

});
