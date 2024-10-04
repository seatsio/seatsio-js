import { TestUtils } from '../testUtils'
import { CategoryUpdateParams } from '../../src/Charts/CategoryUpdateParams'

test('should add a category', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const categories = [
        { key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false }
    ]
    const chart = await client.charts.create(null, null, categories)

    await client.charts.addCategory(chart.key, { key: 2, label: 'Category 2', color: '#bbbbbb', accessible: true })

    const expectedCategories = [
        { key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false },
        { key: 2, label: 'Category 2', color: '#bbbbbb', accessible: true }
    ]
    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    expect(retrievedChart.categories!.list).toEqual(expectedCategories)
})

test('should remove a category', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const categories = [
        { key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false },
        { key: 'cat2', label: 'Category 2', color: '#bbbbbb', accessible: true }
    ]
    const chart = await client.charts.create('aChart', null, categories)

    await client.charts.removeCategory(chart.key, 'cat2')

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    expect(retrievedChart.categories!.list).toEqual([{ key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false }])
})

test('should retrieve the categories of a chart', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const categories = [
        { key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false },
        { key: 'cat2', label: 'Category 2', color: '#bbbbbb', accessible: true }
    ]
    const chart = await client.charts.create('aChart', null, categories)

    const categoryList = await client.charts.listCategories(chart.key)
    expect(categoryList).toEqual(categories)
})

test('should update a category', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const categories = [
        { key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false }
    ]
    const chart = await client.charts.create(null, null, categories)

    await client.charts.updateCategory(chart.key, 1, new CategoryUpdateParams()
        .withLabel('New label').withColor('#bbbbbb').withAccessible(true))

    const categoryList = await client.charts.listCategories(chart.key)
    expect(categoryList).toEqual([{ key: 1, label: 'New label', color: '#bbbbbb', accessible: true }])
})

test('should guard against categories with a null accessible value', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithNullCategoryAccessible(chartKey, user.secretKey)

    const categories = await client.charts.listCategories(chartKey)
    expect(categories[0].accessible).toBe(false)
    expect(categories[1].accessible).toBe(true)
    expect(categories[2].accessible).toBe(false)
})
