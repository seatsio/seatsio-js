import { TestUtils } from '../TestUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list events before given event id', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event1 = await client.events.create(chart.key)
    const event2 = await client.events.create(chart.key)
    const event3 = await client.events.create(chart.key)

    const page = await client.events.listPageBefore(event1.id)

    const eventKeys = [page.items[0].key, page.items[1].key]
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(eventKeys.sort()).toEqual([event3.key, event2.key].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list events before given event id with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event1 = await client.events.create(chart.key)
    const event2 = await client.events.create(chart.key)
    await client.events.create(chart.key)

    const page = await client.events.listPageBefore(event1.id, 1)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items[0].key).toEqual(event2.key)
})
