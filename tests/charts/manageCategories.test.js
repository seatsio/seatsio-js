const testUtils = require('../testUtils.js')

test('should add a category', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const categories = [
        { key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false }
    ]
    const chart = await client.charts.create(null, null, categories)

    await client.charts.addCategory(chart.key, { key: 2, label: 'Category 2', color: '#bbbbbb', accessible: true })
})

test('should remove a category', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const categories = [
        { key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false },
        { key: 'cat2', label: 'Category 2', color: '#bbbbbb', accessible: true }
    ]
    const chart = await client.charts.create('aChart', null, categories)

    await client.charts.removeCategory(chart.key, 'cat2')
})
