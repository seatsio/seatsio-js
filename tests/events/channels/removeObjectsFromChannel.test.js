const testUtils = require('../../testUtils')
const Channel = require('../../../src/Events/Channel')
test('can remove objects from channels', async () => {
    const {
        client,
        user
    } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.channels.add(event.key, 'channelKey1', 'channel 1', '#FFFF98', 1, ['A-1', 'A-2', 'A-3', 'A-4'])

    await client.events.channels.removeObjects(event.key, 'channelKey1', ['A-3', 'A-4'])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.channels).toEqual([
        new Channel({
            key: 'channelKey1',
            name: 'channel 1',
            color: '#FFFF98',
            index: 1,
            objects: ['A-1', 'A-2']
        })
    ])
})
