test('should list events before given event id', async () => {
    let chart = await client.charts.create();
    let event1 = await client.events.create(chart.key);
    let event2 = await client.events.create(chart.key);
    let event3 = await client.events.create(chart.key);

    let page = await client.events.listPageBefore(event1.id);

    let eventKeys = [page.items[0].key, page.items[1].key];
    expect(eventKeys.sort()).toEqual([event3.key, event2.key].sort());
});

test('should list events before given event id with page size', async () => {
    let chart = await client.charts.create();
    let event1 = await client.events.create(chart.key);
    let event2 = await client.events.create(chart.key);
    await client.events.create(chart.key);

    let page = await client.events.listPageBefore(event1.id, 1);

    expect(page.items[0].key).toEqual(event2.key);
});