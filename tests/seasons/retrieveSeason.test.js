const testUtils = require('../testUtils.js')
const TableBookingConfig = require('../../src/Events/TableBookingConfig')
const SeasonParams = require('../../src/Seasons/SeasonParams')

test('retrieve season', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey, new SeasonParams().eventKeys(['event1', 'event2']))
    const partialSeason1 = await client.seasons.createPartialSeason(season.key)
    const partialSeason2 = await client.seasons.createPartialSeason(season.key)

    const retrievedSeason = await client.seasons.retrieve(season.key)

    expect(retrievedSeason.key).toBeTruthy()
    expect(retrievedSeason.id).toBeTruthy()
    expect(retrievedSeason.partialSeasonKeys).toEqual([partialSeason1.key, partialSeason2.key])
    expect(retrievedSeason.events.map(e => e.key)).toEqual(['event1', 'event2'])

    const seasonEvent = retrievedSeason.seasonEvent
    expect(seasonEvent.id).toBeTruthy()
    expect(seasonEvent.key).toBe(retrievedSeason.key)
    expect(seasonEvent.chartKey).toBe(chartKey)
    expect(seasonEvent.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    expect(seasonEvent.supportsBestAvailable).toBe(true)
    expect(seasonEvent.createdOn).toBeInstanceOf(Date)
    expect(seasonEvent.forSaleConfig).toBeFalsy()
    expect(seasonEvent.updatedOn).toBeFalsy()
})
