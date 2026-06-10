import { TestUtils } from '../../testUtils.js'
import { Channel } from '../../../src/Events/Channel.js'

test('can remove a channel', async () => {
    const {
        client,
        user
    } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.add(event.key, 'channelKey1', 'channel 1', '#FFFF98', 1, ['A-1', 'A-2'])
    await client.events.channels.add(event.key, 'channelKey2', 'channel 2', '#FFFF99', 2, ['A-3', 'A-4'])

    await client.events.channels.remove(event.key, 'channelKey2')

    const retrievedEvent = await client.events.retrieve(event.key)
    const [ch1] = retrievedEvent.channels!
    expect(retrievedEvent.channels).toEqual([
        new Channel({ id: ch1.id, key: 'channelKey1', name: 'channel 1', color: '#FFFF98', index: 1, objects: ['A-1', 'A-2'], areaPlaces: {} })
    ])
})
