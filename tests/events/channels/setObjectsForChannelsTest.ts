import { Channel } from '../../../src/Events/Channel'
// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should update channels', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.channels.replace(event.key, {
        channelKey1: {
            name: 'channel 1',
            color: '#FFAABB',
            index: 1
        },
        channelKey2: {
            name: 'channel 2',
            color: '#FFAACC',
            index: 2
        }
    })

    const retrievedEvent = await client.events.retrieve(event.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.channels).toEqual([
        new Channel({
            key: 'channelKey1',
            name: 'channel 1',
            color: '#FFAABB',
            index: 1,
            objects: []
        }),
        new Channel({
            key: 'channelKey2',
            name: 'channel 2',
            color: '#FFAACC',
            index: 2,
            objects: []
        })
    ])
})
