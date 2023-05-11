import { Category } from '../../src/Charts/Category.js'
// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should create a chart with default parameters', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chart.key).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chart.id).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chart.status).toBe('NOT_USED')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chart.name).toBe('Untitled chart')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chart.publishedVersionThumbnailUrl).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chart.draftVersionThumbnailUrl).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chart.tags).toEqual([])
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(chart.archived).toBe(false)

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.venueType).toEqual('MIXED')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.categories.list).toEqual([])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should create chart with name', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create('aChart')

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.name).toEqual('aChart')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.venueType).toEqual('MIXED')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.categories.list).toEqual([])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should create chart with venue type', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create(null, 'BOOTHS')

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.name).toEqual('Untitled chart')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.venueType).toEqual('BOOTHS')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.categories.list).toEqual([])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should create chart with categories as class', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const cat1 = { key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false }
    const cat2 = { key: 3, label: 'Category 2', color: '#bbbbbb', accessible: true }

    const chart = await client.charts.create(null, null, [cat1, cat2])

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.name).toEqual('Untitled chart')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.venueType).toEqual('MIXED')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.categories.list).toEqual([cat1, cat2])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should create chart with categories as instance of Category class', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const cat1 = new Category(1, 'Category 1', '#aaaaaa')
    const cat2 = new Category(2, 'Category 2', '#bbbbbb', true)
    const expectedCategories = [
        { key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false },
        { key: 2, label: 'Category 2', color: '#bbbbbb', accessible: true }]

    const chart = await client.charts.create(null, null, [cat1, cat2])

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.name).toEqual('Untitled chart')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.venueType).toEqual('MIXED')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.categories.list).toEqual(expectedCategories)
})
