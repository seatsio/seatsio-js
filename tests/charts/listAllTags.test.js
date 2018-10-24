const testUtils = require('../testUtils.js');

test('should retrieve all tags of all charts', async () =>{
    const user = await testUtils.createTestUser();
    var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
    var chart1 = await client.charts.create();
    var chart2 = await client.charts.create();
    await client.charts.addTag(chart1.key, 'tag1');
    await client.charts.addTag(chart2.key, 'tag2');

    var allTags = await client.charts.listAllTags();
    expect(allTags).toContain('tag1');
    expect(allTags).toContain('tag2');
    expect(allTags.length).toBe(2);
});
