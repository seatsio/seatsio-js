import { TestUtils } from '../testUtils'

test('should remove tag', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.charts.addTag(chart.key, 'tag1')
    await client.charts.addTag(chart.key, 'tag2')

    await client.charts.removeTag(chart.key, 'tag1')

    const retrievedChart = await client.charts.retrieve(chart.key)
    expect(retrievedChart.tags).toEqual(['tag2'])
})
