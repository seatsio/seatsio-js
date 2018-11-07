const testUtils = require('../testUtils.js');

test('should mark everything as for sale', async () => {
    var chart = await client.charts.create();
    var event = await client.events.create(chart.key);
    await client.events.markAsForSale(event.key, ['o1', '02'], ['cat1', 'cat2']);
    await client.events.markEverythingAsForSale(event.key);
    var retrievedEvent = await client.events.retrieve(event.key);
    expect(retrievedEvent.forSaleConfig).toBeUndefined();
    expect(retrievedEvent.forSaleConfig).toBeFalsy();
});
