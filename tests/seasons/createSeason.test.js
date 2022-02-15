const testUtils = require('../testUtils.js')
const SocialDistancingRuleset = require('../../src/Charts/SocialDistancingRuleset.js')
const TableBookingConfig = require('../../src/Events/TableBookingConfig')
const SeasonParams = require('../../src/Seasons/SeasonParams')

test('chart key is required', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const season = await client.seasons.create(chartKey)

    expect(season.partialSeasonKeys.length).toBe(0)
    expect(season.events.length).toBe(0)
    expect(season.id).toBeTruthy()
    expect(season.key).toBe(season.key)
    expect(season.chartKey).toBe(chartKey)
    expect(season.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    expect(season.supportsBestAvailable).toBe(true)
    expect(season.createdOn).toBeInstanceOf(Date)
    expect(season.forSaleConfig).toBeFalsy()
    expect(season.updatedOn).toBeFalsy()
})

test('key can be passed in', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const season = await client.seasons.create(chart.key, new SeasonParams().key('aSeason'))

    expect(season.key).toBe('aSeason')
})

test('number of events can be passed in', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const season = await client.seasons.create(chart.key, new SeasonParams().numberOfEvents(2))

    expect(season.events.length).toBe(2)
})

test('event keys can be passed in', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const season = await client.seasons.create(chart.key, new SeasonParams().eventKeys(['event1', 'event2']))

    expect(season.events.map(event => event.key)).toEqual(['event1', 'event2'])
})

test('table booking config can be passed in', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)
    const tableBookingConfig = TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' })

    const season = await client.seasons.create(chartKey, new SeasonParams().tableBookingConfig(tableBookingConfig))

    expect(season.tableBookingConfig).toEqual(tableBookingConfig)
})

test('social distancing ruleset key can be passed in', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = { ruleset1: SocialDistancingRuleset.ruleBased('My ruleset').build() }
    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)

    const season = await client.seasons.create(chart.key, new SeasonParams().socialDistancingRulesetKey('ruleset1'))

    expect(season.socialDistancingRulesetKey).toBe('ruleset1')
})
