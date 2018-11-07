const testUtils = require('../testUtils.js');

test('should retrieve thumbnail for the published version of chart', async () => {
    var chart = await client.charts.create();
    var thumbnail = await client.charts.retrievePublishedVersionThumbnail(chart.key);
    expect(thumbnail).toContain('<!DOCTYPE svg');
});
