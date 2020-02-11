const testUtils = require('../testUtils.js')

test('listAll events when there are more than 20 events)', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const events = await testUtils.createArray(25, () => client.events.create(chart.key))

    const retrievedEventKeys = []
    for await (const event of client.events.listAll()) {
        retrievedEventKeys.push(event.key)
    }

    expect(retrievedEventKeys.sort()).toEqual(events.map(e => e.key).sort())
})

test('listAll with more than 40 events)', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const events = await testUtils.createArray(45, () => client.events.create(chart.key))

    const retrievedEventKeys = []
    for await (const event of client.events.listAll()) {
        retrievedEventKeys.push(event.key)
    }

    expect(retrievedEventKeys.sort()).toEqual(events.map(e => e.key).sort())
})
