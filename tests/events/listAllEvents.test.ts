import { TestUtils } from '../TestUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('listAll events when there are more than 10 events)', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const events = await TestUtils.createArray(15, () => client.events.create(chart.key))

    const retrievedEventKeys = []
    for await (const event of client.events.listAll()) {
        retrievedEventKeys.push(event.key)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEventKeys.sort()).toEqual(events.map(e => e.key).sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('list seasons', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.seasons.create(chart.key)
    await client.seasons.create(chart.key)
    await client.seasons.create(chart.key)

    const areSeasons = []
    for await (const season of client.events.listAll()) {
        areSeasons.push(season.isSeason())
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(areSeasons).toEqual([true, true, true])
})
