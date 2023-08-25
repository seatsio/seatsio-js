import { TestUtils } from '../../testUtils'
import { Channel } from '../../../src/Events/Channel'

test('should assign objects to channels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const channels = [
        new Channel({ key: 'channelKey1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1', 'A-2'] }),
        new Channel({ key: 'channelKey2', name: 'channel 2', color: 'red', index: 2, objects: ['A-3'] })
    ]

    await client.events.channels.replace(event.key, channels)

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.channels).toEqual(channels)
})
