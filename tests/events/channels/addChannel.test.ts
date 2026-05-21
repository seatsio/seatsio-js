import { Channel } from '../../../src/Events/Channel'
import { TestUtils } from '../../testUtils'

test('can add a channel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.channels.add(event.key, 'channelKey1', 'channel 1', '#FFFF98', 1, ['A-1', 'A-2'], { GA1: 5 })
    await client.events.channels.add(event.key, 'channelKey2', 'channel 2', '#FFFF99', 2, ['A-3'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.channels).toEqual([
        new Channel({
            key: 'channelKey1',
            name: 'channel 1',
            color: '#FFFF98',
            index: 1,
            objects: ['A-1', 'A-2'],
            areaPlaces: { GA1: 5 }
        }),
        new Channel({
            key: 'channelKey2',
            name: 'channel 2',
            color: '#FFFF99',
            index: 2,
            objects: ['A-3'],
            areaPlaces: {}
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
            { key: 'channelKey1', name: 'channel 1', color: '#FFFF98', index: 1, objects: ['A-1', 'A-2'], areaPlaces: { GA1: 5 } },
            { key: 'channelKey2', name: 'channel 2', color: '#FFFF99', index: 2, objects: ['A-3'], areaPlaces: { GA1: 3 } }
        ]
    )

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.channels).toEqual([
        new Channel({
            key: 'channelKey1',
            name: 'channel 1',
            color: '#FFFF98',
            index: 1,
            objects: ['A-1', 'A-2'],
            areaPlaces: { GA1: 5 }
        }),
        new Channel({
            key: 'channelKey2',
            name: 'channel 2',
            color: '#FFFF99',
            index: 2,
            objects: ['A-3'],
            areaPlaces: { GA1: 3 }
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
            objects: ['A-1', 'A-2'],
            areaPlaces: {}
        })
    ])
})

test('areaPlaces are optional', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.channels.add(event.key, 'channelKey1', 'channel 1', '#FFFF98', 1, ['A-1'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.channels).toEqual([
        new Channel({
            key: 'channelKey1',
            name: 'channel 1',
            color: '#FFFF98',
            index: 1,
            objects: ['A-1'],
            areaPlaces: {}
        })
    ])
})

test('objects are optional', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.channels.add(event.key, 'channelKey1', 'channel 1', '#FFFF98', 1, undefined, { GA1: 5 })

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.channels).toEqual([
        new Channel({
            key: 'channelKey1',
            name: 'channel 1',
            color: '#FFFF98',
            index: 1,
            objects: [],
            areaPlaces: { GA1: 5 }
        })
    ])
})
