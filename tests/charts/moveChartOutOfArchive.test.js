const testUtils = require('../testUtils.js');

test('should move chart out of archive', async () => {
    var chart = await client.charts.create();
    await client.charts.moveToArchive(chart.key);
    await client.charts.moveOutOfArchive(chart.key);
    var archivedChartsPageIterator = client.charts.archive[Symbol.asyncIterator]();
    var page = await archivedChartsPageIterator.next();

    expect(page.value.items.length).toBe(0);
});
