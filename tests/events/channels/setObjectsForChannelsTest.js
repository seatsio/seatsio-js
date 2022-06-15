const testUtils = require('../../testUtils.js')
const Channel = require('../../../src/Events/Channel.js')

test('should update channels', async () => {
    const {client} = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.channels.replace(event.key, {
        "channelKey1": {
            "name": "channel 1",
            "color": "#FFAABB",
            "index": 1
        },
        "channelKey2": {
            "name": "channel 2",
            "color": "#FFAACC",
            "index": 2
        }
    })

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.channels).toEqual([
        new Channel({
            "key": "channelKey1",
            "name": "channel 1",
            "color": "#FFAABB",
            "index": 1,
            "objects": []
        }),
        new Channel({
            "key": "channelKey2",
            "name": "channel 2",
            "color": "#FFAACC",
            "index": 2,
            "objects": []
        })
    ])
})
