test('should list events in first page', async () => {
    let eventKeys = [];
    let chart = await client.charts.create();
    for (let i = 0; i < 20; i++) {
        let event = await client.events.create(chart.key);
        eventKeys.push(event.key);
    }

    let page = await client.events.listFirstPage();

    let retrievedEventKeys = page.items.map((event) => event.key);
    expect(eventKeys.sort()).toEqual(retrievedEventKeys.sort());
});

test('should list events in first page with page size', async () => {
    let eventKeys = [];
    let chart = await client.charts.create();
    for (let i = 0; i < 20; i++) {
        let event = await client.events.create(chart.key);
        eventKeys.push(event.key);
    }

    let page = await client.events.listFirstPage(5);

    let retrievedEventKeys = page.items.map((event) => event.key);
    expect(retrievedEventKeys.length).toBe(5);
    expect(eventKeys.slice(15).sort()).toEqual(retrievedEventKeys.sort());
});