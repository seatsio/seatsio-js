import { EventObjectInfo } from '../../src/Events/EventObjectInfo'
import { TestUtils } from '../testUtils'

test('should put objects up for resale', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const bookRes = await client.events.putUpForResale(event.key, ['A-1', 'A-2'])

    const promises = [
        client.events.retrieveObjectInfo(event.key, 'A-1'),
        client.events.retrieveObjectInfo(event.key, 'A-2')
    ]
    const retrievedObjectStatuses = await Promise.all(promises)
    expect(retrievedObjectStatuses[0].status).toEqual(EventObjectInfo.RESALE)
    expect(retrievedObjectStatuses[1].status).toEqual(EventObjectInfo.RESALE)
    expect(Object.keys(bookRes.objects).sort()).toEqual(['A-1', 'A-2'])
})
