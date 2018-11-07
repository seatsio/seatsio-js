test('should retrieve all tags of all charts', async () => {
    let chart1 = await client.charts.create();
    let chart2 = await client.charts.create();
    await client.charts.addTag(chart1.key, 'tag1');
    await client.charts.addTag(chart2.key, 'tag2');

    let allTags = await client.charts.listAllTags();

    expect(allTags.sort()).toEqual(['tag1', 'tag2']);
});
