const testUtils = require('../testUtils.js')

test('delete season', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey)

    await client.seasons.delete(season.key)

    try {
        await client.seasons.retrieve(season.key)
        throw new Error('Should have failed')
    } catch (e) {
        expect(e.errors[0].code).toBe('SEASON_NOT_FOUND')
    }
})
