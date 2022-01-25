const testUtils = require('../testUtils.js')

test('list all seasons', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season1 = await client.seasons.create(chart.key)
    const season2 = await client.seasons.create(chart.key)
    const season3 = await client.seasons.create(chart.key)

    const retrievedSeasonKeys = []
    for await (const season of client.seasons.listAll()) {
        retrievedSeasonKeys.push(season.key)
    }

    expect(retrievedSeasonKeys).toEqual([season3.key, season2.key, season1.key])
})
