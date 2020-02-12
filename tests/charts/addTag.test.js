const testUtils = require('../testUtils.js')

test('should add tag', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    await client.charts.addTag(chart.key, 'tag1')

    const retrievedChart = await client.charts.retrieve(chart.key)
    expect(retrievedChart.key).toBe(chart.key)
    expect(retrievedChart.tags).toEqual(['tag1'])
})

test('should be able to add a tag with special characters', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    await client.charts.addTag(chart.key, 'tag1/:"-<>')

    const retrievedChart = await client.charts.retrieve(chart.key)
    expect(retrievedChart.tags).toEqual(['tag1/:"-<>'])
})
