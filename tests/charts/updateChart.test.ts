// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should update chart name', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const categories = [{ key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false }]
    const chart = await client.charts.create(null, null, categories)

    await client.charts.update(chart.key, 'aChart')

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.name).toBe('aChart')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.categories.list).toEqual(categories)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should update chart categories', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create('aChart')
    const categories = [{ key: 1, label: 'Category 1', color: '#aaaaaa', accessible: false }, { key: 2, label: 'Category 2', color: '#bbbbbb', accessible: true }]

    await client.charts.update(chart.key, null, categories)

    const retrievedChart = await client.charts.retrievePublishedVersion(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.name).toBe('aChart')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.categories.list).toEqual(categories)
})
