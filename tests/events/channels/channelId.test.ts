import { TestUtils } from '../../testUtils.js'

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
