// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.categories.list).toEqual(expectedCategories)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should remove a category', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const categories = [
        { key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false },
        { key: 'cat2', label: 'Category 2', color: '#bbbbbb', accessible: true }
    ]
    const chart = await client.charts.create('aChart', null, categories)

    await client.charts.removeCategory(chart.key, 'cat2')

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.categories.list).toEqual([{ key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false }])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should retrieve the categories of a chart', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const categories = [
        { key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false },
        { key: 'cat2', label: 'Category 2', color: '#bbbbbb', accessible: true }
    ]
    const chart = await client.charts.create('aChart', null, categories)

    const categoryList = await client.charts.listCategories(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(categoryList).toEqual(categories)
})
