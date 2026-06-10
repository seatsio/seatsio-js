import { TestUtils } from '../../testUtils.js'
import { Channel } from '../../../src/Events/Channel.js'

test('should assign objects to channels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const channels = [
        { key: 'channelKey1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1', 'A-2'], areaPlaces: { GA1: 3 } },
        { key: 'channelKey2', name: 'channel 2', color: 'red', index: 2, objects: ['A-3'] }
    ]

    await client.events.channels.replace(event.key, channels)

    const retrievedEvent = await client.events.retrieve(event.key)
    const [ch1, ch2] = retrievedEvent.channels!
    expect(retrievedEvent.channels).toEqual([
        new Channel({ id: ch1.id, key: 'channelKey1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1', 'A-2'], areaPlaces: { GA1: 3 } }),
        new Channel({ id: ch2.id, key: 'channelKey2', name: 'channel 2', color: 'red', index: 2, objects: ['A-3'], areaPlaces: {} })
    ])
})
