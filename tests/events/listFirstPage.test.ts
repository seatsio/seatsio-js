import { TestUtils } from '../TestUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list events in first page', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const events = await TestUtils.createArray(3, () => client.events.create(chart.key))

    const page = await client.events.listFirstPage()

    const retrievedEventKeys = page.items.map((event: any) => event.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEventKeys.sort()).toEqual(events.map(e => e.key).sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list events in first page with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await TestUtils.createArray(7, () => client.events.create(chart.key))
    const event8 = await client.events.create(chart.key)
    const event9 = await client.events.create(chart.key)
    const event10 = await client.events.create(chart.key)

    const page = await client.events.listFirstPage(3)

    const retrievedEventKeys = page.items.map((event: any) => event.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEventKeys.length).toBe(3)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEventKeys).toEqual([event10.key, event9.key, event8.key])
})
