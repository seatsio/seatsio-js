const testUtils = require('../testUtils.js');

test('should mark objects as for sale', async () => {
    var chart = await client.charts.create();
    var event = await client.events.create(chart.key);
    await client.events.markAsForSale(event.key, ['o1', 'o2'], ['cat1', 'cat2']);
    var retrievedEvent = await client.events.retrieve(event.key);

    expect(retrievedEvent.forSaleConfig.forSale).toBe(true);
    expect(retrievedEvent.forSaleConfig.objects).toEqual(['o1', 'o2']);
    expect(retrievedEvent.forSaleConfig.categories).toEqual(['cat1', 'cat2']);
});

test('that categories are optional', async () => {
    var chart = await client.charts.create();
    var event = await client.events.create(chart.key);
    await client.events.markAsForSale(event.key, ['o1', 'o2']);
    var retrievedEvent = await client.events.retrieve(event.key);

    expect(retrievedEvent.forSaleConfig.objects).toEqual(['o1', 'o2']);
    expect(retrievedEvent.forSaleConfig.categories.length).toBe(0);
});

test('that objects are optional', async () => {
    var chart = await client.charts.create();
    var event = await client.events.create(chart.key);
    await client.events.markAsForSale(event.key, null, ['cat1', 'cat2']);
    var retrievedEvent = await client.events.retrieve(event.key);

    expect(retrievedEvent.forSaleConfig.categories).toEqual(['cat1', 'cat2']);
    expect(retrievedEvent.forSaleConfig.objects.length).toBe(0);
});
