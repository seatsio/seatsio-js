import { EventObjectInfo } from '../../src/Events/EventObjectInfo'
import { TestUtils } from '../testUtils'
import { CreateSeasonParams } from '../../src/Seasons/CreateSeasonParams'

test('should use the season object status', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey, new CreateSeasonParams().eventKeys(['anEvent']))
    await client.events.book(season.key, ['A-1', 'A-2'])
    await client.events.overrideSeasonObjectStatus('anEvent', ['A-1', 'A-2'])

    await client.events.useSeasonObjectStatus('anEvent', ['A-1', 'A-2'])

    const retrievedObjectStatuses = await client.events.retrieveObjectInfos('anEvent', ['A-1', 'A-2'])
    expect(retrievedObjectStatuses['A-1'].status).toEqual(EventObjectInfo.BOOKED)
    expect(retrievedObjectStatuses['A-2'].status).toEqual(EventObjectInfo.BOOKED)
})
