import { TestUtils } from '../TestUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should mark everything as for sale', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)
    await client.events.markAsForSale(event.key, ['o1', 'o2'], null, ['cat1', 'cat2'])

    await client.events.markEverythingAsForSale(event.key)

    const retrievedEvent = await client.events.retrieve(event.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.forSaleConfig).toBeFalsy()
})
