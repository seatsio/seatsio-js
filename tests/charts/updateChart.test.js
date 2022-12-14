const testUtils = require('../testUtils.js')

test('should update chart name', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const categories = [{ key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false }]
    const chart = await client.charts.create(null, null, categories)

    const response = await client.charts.update(chart.key, 'aChart')
    expect(response.status).toEqual(204)
})

test('should update chart categories', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create('aChart')
    const categories = [{ key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false }, { key: 2, label: 'Category 2', color: '#bbbbbb', accessible: true }]

    const response = await client.charts.update(chart.key, null, categories)
    expect(response.status).toEqual(204)
})
