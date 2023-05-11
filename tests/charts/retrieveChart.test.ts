// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should retrieve chart', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.charts.addTag(chart.key, 'tag1')

    const retrievedChart = await client.charts.retrieve(chart.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.key).toBe(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.id).toBe(chart.id)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.id).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.name).toBe('Untitled chart')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.status).toBe('NOT_USED')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.publishedVersionThumbnailUrl).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.draftVersionThumbnailUrl).toBeNull()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.tags).toEqual(['tag1'])
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.archived).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.events).toEqual([])
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedChart.socialDistancingRulesets).toEqual({})
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should retrieve chart with events', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event1 = await client.events.create(chart.key)
    const event2 = await client.events.create(chart.key)

    const retrievedChart = await client.charts.retrieveWithEvents(chart.key)

    const retrievedEventIds = [retrievedChart.events[0].id, retrievedChart.events[1].id]
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEventIds.sort()).toEqual([event1.id, event2.id].sort())
})
