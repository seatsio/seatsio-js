import { TestUtils } from '../testUtils'
import { Category } from '../../src/Charts/Category'

test('should create a chart with default parameters', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    expect(chart.key).toBeTruthy()
    expect(chart.id).toBeTruthy()
    expect(chart.status).toBe('NOT_USED')
    expect(chart.name).toBe('Untitled chart')
    expect(chart.publishedVersionThumbnailUrl).toBeTruthy()
    expect(chart.draftVersionThumbnailUrl).toBeNull()
    expect(chart.tags).toEqual([])
    expect(chart.archived).toBe(false)

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    expect(retrievedChart.venueType).toEqual('SIMPLE')
    expect(retrievedChart.categories!.list).toEqual([])
})

test('should create chart with name', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create('aChart')

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    expect(retrievedChart.name).toEqual('aChart')
    expect(retrievedChart.venueType).toEqual('SIMPLE')
    expect(retrievedChart.categories!.list).toEqual([])
})

test('should create chart with venue type', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create(null, 'SIMPLE')

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    expect(retrievedChart.name).toEqual('Untitled chart')
    expect(retrievedChart.venueType).toEqual('SIMPLE')
    expect(retrievedChart.categories!.list).toEqual([])
})

test('should create chart with categories as class', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const cat1 = { key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false }
    const cat2 = { key: 3, label: 'Category 2', color: '#bbbbbb', accessible: true }

    const chart = await client.charts.create(null, null, [cat1, cat2])

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    expect(retrievedChart.name).toEqual('Untitled chart')
    expect(retrievedChart.venueType).toEqual('SIMPLE')
    expect(retrievedChart.categories!.list).toEqual([cat1, cat2])
})

test('should create chart with categories as instance of Category class', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const cat1 = new Category(1, 'Category 1', '#aaaaaa', false)
    const cat2 = new Category(2, 'Category 2', '#bbbbbb', true)
    const expectedCategories = [
        { key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false },
        { key: 2, label: 'Category 2', color: '#bbbbbb', accessible: true }]

    const chart = await client.charts.create(null, null, [cat1, cat2])

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    expect(retrievedChart.name).toEqual('Untitled chart')
    expect(retrievedChart.venueType).toEqual('SIMPLE')
    expect(retrievedChart.categories!.list).toEqual(expectedCategories)
})
