import { Channel } from '../../../src/Events/Channel'
import { TestUtils } from '../../testUtils'

test('can add a channel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.channels.add(event.key, 'channelKey1', 'channel 1', '#FFFF98', 1, ['A-1', 'A-2'])
    await client.events.channels.add(event.key, 'channelKey2', 'channel 2', '#FFFF99', 2, ['A-3'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.channels).toEqual([
        new Channel({
            key: 'channelKey1',
            name: 'channel 1',
            color: '#FFFF98',
            index: 1,
            objects: ['A-1', 'A-2']
        }),
        new Channel({
            key: 'channelKey2',
            name: 'channel 2',
            color: '#FFFF99',
            index: 2,
            objects: ['A-3']
        })
    ])
})

test('can add multiple channels', async () => {
    const {
        client,
        user
    } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.channels.addMultiple(
        event.key,
        [
            { key: 'channelKey1', name: 'channel 1', color: '#FFFF98', index: 1, objects: ['A-1', 'A-2'] },
            { key: 'channelKey2', name: 'channel 2', color: '#FFFF99', index: 2, objects: ['A-3'] }
        ]
    )

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.channels).toEqual([
        new Channel({
            key: 'channelKey1',
            name: 'channel 1',
            color: '#FFFF98',
            index: 1,
            objects: ['A-1', 'A-2']
        }),
        new Channel({
            key: 'channelKey2',
            name: 'channel 2',
            color: '#FFFF99',
            index: 2,
            objects: ['A-3']
        })
    ])
})

test('index is optional', async () => {
    const {
        client,
        user
    } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.channels.add(event.key, 'channelKey1', 'channel 1', '#FFFF98', undefined, ['A-1', 'A-2'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.channels).toEqual([
        new Channel({
            key: 'channelKey1',
            name: 'channel 1',
            color: '#FFFF98',
            objects: ['A-1', 'A-2']
        })
    ])
})

test('objects are optional', async () => {
    const {
        client,
        user
    } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.channels.add(event.key, 'channelKey1', 'channel 1', '#FFFF98', 1, undefined)

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.channels).toEqual([
        new Channel({
            key: 'channelKey1',
            name: 'channel 1',
            color: '#FFFF98',
            index: 1,
            objects: []
        })
    ])
})
