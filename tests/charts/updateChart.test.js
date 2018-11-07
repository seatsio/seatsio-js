const testUtils = require('../testUtils.js');

test('should update chart name', async () => {
    var categories = [
        {
            'key': 1,
            'label': 'Category 1',
            'color': '#aaaaaa'
        }
    ];
    var chart = await client.charts.create(null, null, categories);
    await client.charts.update(chart.key, 'aChart');
    var retrievedChart = await client.charts.retrievePublishedVersion(chart.key);
    expect(retrievedChart.name).toBe('aChart');
    expect(retrievedChart.categories.list).toEqual(categories);
});

test('should update chart categories', async () => {
    var chart = await client.charts.create('aChart')
    var categories = [
        {
            'key': 1,
            'label': 'Category 1',
            'color': '#aaaaaa'
        }
    ];
    await client.charts.update(chart.key, null, categories);
    var retrievedChart = await client.charts.retrievePublishedVersion(chart.key);
    expect(retrievedChart.name).toBe('aChart');
    expect(retrievedChart.categories.list).toEqual(categories);
});
