import { TestUtils } from '../../testUtils'

test('channel has an id', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.channels.add(event.key, 'channelKey1', 'channel 1', '#FFFF98', 1, ['A-1'])

    const retrievedEvent = await client.events.retrieve(event.key)
    const channel = retrievedEvent.channels![0]
    expect(channel.id).toBeTruthy()
    expect(typeof channel.id).toBe('string')
})

test('areaPartitionLabel combines area label with channel id', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.channels.add(event.key, 'channelKey1', 'channel 1', '#FFFF98', 1, ['A-1'])

    const retrievedEvent = await client.events.retrieve(event.key)
    const channel = retrievedEvent.channels![0]
    expect(channel.areaPartitionLabel('GA1')).toBe(`GA1##${channel.id}`)
})

