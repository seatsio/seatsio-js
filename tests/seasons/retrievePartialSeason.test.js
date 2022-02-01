const testUtils = require('../testUtils.js')
const TableBookingConfig = require('../../src/Events/TableBookingConfig')

test('retrieve partial season', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey)
    const partialSeason = await client.seasons.createPartialSeason(season.key)

    const retrievedPartialSeason = await client.seasons.retrievePartialSeason(season.key, partialSeason.key)

    expect(retrievedPartialSeason.key).toBe(partialSeason.key)
    expect(retrievedPartialSeason.id).toBeTruthy()

    const seasonEvent = retrievedPartialSeason.seasonEvent
    expect(seasonEvent.id).toBeTruthy()
    expect(seasonEvent.key).toBe(retrievedPartialSeason.key)
    expect(seasonEvent.chartKey).toBe(chartKey)
    expect(seasonEvent.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    expect(seasonEvent.supportsBestAvailable).toBe(true)
    expect(seasonEvent.createdOn).toBeInstanceOf(Date)
    expect(seasonEvent.forSaleConfig).toBeFalsy()
    expect(seasonEvent.updatedOn).toBeFalsy()
})
