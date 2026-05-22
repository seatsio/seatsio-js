import { TestUtils } from '../../testUtils'
import { Channel } from '../../../src/Events/Channel'

test('can add objects, moving them from one channel to another', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.add(event.key, 'channelKey1', 'channel 1', '#FFFF98', 1, ['A-1', 'A-2'])
    await client.events.channels.add(event.key, 'channelKey2', 'channel 2', '#FFFF99', 2, ['A-3', 'A-4'])

    await client.events.channels.addObjects(event.key, 'channelKey1', ['A-3', 'A-4'])

    const retrievedEvent = await client.events.retrieve(event.key)
    const [ch1, ch2] = retrievedEvent.channels!
    expect(retrievedEvent.channels).toEqual([
        new Channel({ id: ch1.id, key: 'channelKey1', name: 'channel 1', color: '#FFFF98', index: 1, objects: ['A-1', 'A-2', 'A-3', 'A-4'], areaPlaces: {} }),
        new Channel({ id: ch2.id, key: 'channelKey2', name: 'channel 2', color: '#FFFF99', index: 2, objects: [], areaPlaces: {} })
    ])
})

test('can add areaPlaces to a channel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.add(event.key, 'channelKey1', 'channel 1', '#FFFF98', 1, [])

    await client.events.channels.addObjects(event.key, 'channelKey1', [], { GA1: 5 })

    const retrievedEvent = await client.events.retrieve(event.key)
    const [ch1] = retrievedEvent.channels!
    expect(retrievedEvent.channels).toEqual([
        new Channel({ id: ch1.id, key: 'channelKey1', name: 'channel 1', color: '#FFFF98', index: 1, objects: [], areaPlaces: { GA1: 5 } })
    ])
})
