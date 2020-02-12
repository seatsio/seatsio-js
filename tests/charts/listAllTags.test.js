const testUtils = require('../testUtils.js')

test('should retrieve all tags of all charts', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    await client.charts.addTag(chart1.key, 'tag1')
    await client.charts.addTag(chart2.key, 'tag2')

    const allTags = await client.charts.listAllTags()

    expect(allTags.sort()).toEqual(['tag1', 'tag2'])
})
