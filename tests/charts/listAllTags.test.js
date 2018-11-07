const testUtils = require('../testUtils.js');

test('should retrieve all tags of all charts', async () => {
    var chart1 = await client.charts.create();
    var chart2 = await client.charts.create();
    await client.charts.addTag(chart1.key, 'tag1');
    await client.charts.addTag(chart2.key, 'tag2');

    var allTags = await client.charts.listAllTags();
    expect(allTags.sort()).toEqual(['tag1', 'tag2']);
});
