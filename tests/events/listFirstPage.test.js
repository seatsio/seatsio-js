test('should list events in first page', async () => {
    jest.setTimeout(40000);
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