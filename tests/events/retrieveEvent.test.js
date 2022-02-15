const testUtils = require('../testUtils.js')
const TableBookingConfig = require('../../src/Events/TableBookingConfig')
const SeasonParams = require("../../src/Seasons/SeasonParams");

test('should retrieve event', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const now = new Date()
    const event = await client.events.create(chartKey)

    const retrievedEvent = await client.events.retrieve(event.key)

    expect(retrievedEvent.key).toBe(event.key)
    expect(retrievedEvent.id).toBe(event.id)
    expect(retrievedEvent.chartKey).toBe(chartKey)
    expect(retrievedEvent.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    expect(retrievedEvent.supportsBestAvailable).toBe(true)
    expect(retrievedEvent.createdOn).toBeInstanceOf(Date)
    expect(retrievedEvent.createdOn.getTime()).toBeLessThanOrEqual(now.getTime() + 5000)
    expect(retrievedEvent.forSaleConfig).toBeFalsy()
    expect(retrievedEvent.updatedOn).toBeNull()
})

test('retrieve season', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey, new SeasonParams().eventKeys(['event1', 'event2']))
    const partialSeason1 = await client.seasons.createPartialSeason(season.key)
    const partialSeason2 = await client.seasons.createPartialSeason(season.key)

    const retrievedSeason = await client.events.retrieve(season.key)

    expect(retrievedSeason.key).toBeTruthy()
    expect(retrievedSeason.id).toBeTruthy()
    expect(retrievedSeason.partialSeasonKeys).toEqual([partialSeason1.key, partialSeason2.key])
    expect(retrievedSeason.events.map(e => e.key)).toEqual(['event1', 'event2'])
    expect(retrievedSeason.chartKey).toBe(chartKey)
    expect(retrievedSeason.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    expect(retrievedSeason.supportsBestAvailable).toBe(true)
    expect(retrievedSeason.createdOn).toBeInstanceOf(Date)
    expect(retrievedSeason.forSaleConfig).toBeFalsy()
    expect(retrievedSeason.updatedOn).toBeFalsy()
})
