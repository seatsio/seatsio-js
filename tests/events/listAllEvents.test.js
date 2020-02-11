const testUtils = require('../testUtils.js')

test('listAll events when there are more than 20 events)', async () => {
    let chart = await client.charts.create()

    let events = await testUtils.createArray(25, () => client.events.create(chart.key))

    let retrievedEventKeys = []
    for await (let event of client.events.listAll()) {
        retrievedEventKeys.push(event.key)
    }

    expect(retrievedEventKeys.sort()).toEqual(events.map(e => e.key).sort())
})

test('listAll with more than 40 events)', async () => {
    let chart = await client.charts.create()

    let events = await testUtils.createArray(45, () => client.events.create(chart.key))

    let retrievedEventKeys = []
    for await (let event of client.events.listAll()) {
        retrievedEventKeys.push(event.key)
    }

    expect(retrievedEventKeys.sort()).toEqual(events.map(e => e.key).sort())
})
