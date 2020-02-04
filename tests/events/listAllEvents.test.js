const testUtils = require('../testUtils.js')

test('listAll events when there are more than 40 events)', async () => {
    let chart = await client.charts.create()

    let eventPromises = testUtils.createArray(41, () => client.events.create(chart.key))
    let events = await Promise.all(eventPromises)

    let retrievedEventKeys = []
    for await (let event of client.events.listAll()) {
        retrievedEventKeys.push(event.key)
    }

    expect(retrievedEventKeys.sort()).toEqual(events.map(e => e.key).sort())
})
