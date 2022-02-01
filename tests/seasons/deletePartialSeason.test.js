const testUtils = require('../testUtils.js')

test('delete partial season', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey)
    const partialSeason = await client.seasons.createPartialSeason(season.key)

    await client.seasons.deletePartialSeason(season.key, partialSeason.key)

    try {
        await client.seasons.retrievePartialSeason(season.key, partialSeason.key)
        throw new Error('Should have failed')
    } catch (e) {
        expect(e.errors[0].code).toBe('SEASON_NOT_FOUND')
    }
})
