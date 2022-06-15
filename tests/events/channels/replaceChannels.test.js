const testUtils = require('../../testUtils.js')
const Channel = require('../../../src/Events/Channel.js')

test('should assign objects to channels', async () => {
    const {client, user} = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.replace(event.key, {
        "channelKey1": {name: "channel 1", color: "blue", index: 1},
        "channelKey2": {name: "channel 2", color: "red", index: 2}
    })

    await client.events.channels.setObjects(event.key, {
        "channelKey1": ["A-1", "A-2"],
        "channelKey2": ["A-3"]
    })

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.channels).toEqual([
        new Channel({
            "key": "channelKey1",
            "name": "channel 1",
            "color": "blue",
            "index": 1,
            "objects": ['A-1', 'A-2']
        }),
        new Channel({
            "key": "channelKey2",
            "name": "channel 2",
            "color": "red",
            "index": 2,
            "objects": ['A-3']
        })
    ])

})
