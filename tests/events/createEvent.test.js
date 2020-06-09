const testUtils = require('../testUtils.js')
const SocialDistancingRuleset = require('../../src/Charts/SocialDistancingRuleset.js')

test('should check that only chart key is required', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey)

    expect(event.key).toBeTruthy()
    expect(event.id).toBeTruthy()
    expect(event.chartKey).toBe(chartKey)
    expect(event.bookWholeTables).toBe(false)
    expect(event.supportsBestAvailable).toBe(true)
    expect(event.createdOn).toBeInstanceOf(Date)
    expect(event.forSaleConfig).toBeFalsy()
    expect(event.updatedOn).toBeFalsy()
})

test('should pass in event key as a create() param', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const event = await client.events.create(chart.key, 'eventKey')

    expect(event.key).toBe('eventKey')
})

test('should pass in BookWholeTables as a create() param', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const event = await client.events.create(chart.key, null, false)

    expect(event.key).toBeTruthy()
    expect(event.bookWholeTables).toBe(false)
})

test('should pass in tableBookingModes as a create() param', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)
    const tableBookingModes = { T1: 'BY_TABLE', T2: 'BY_SEAT' }

    const event = await client.events.create(chartKey, null, tableBookingModes)

    expect(event.key).toBeTruthy()
    expect(event.bookWholeTables).toBe(false)
    expect(event.tableBookingModes).toEqual(tableBookingModes)
})

test('it supports a social distancing ruleset key', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = { ruleset1: new SocialDistancingRuleset(0, 'My ruleset') }
    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)

    const event = await client.events.create(chart.key, null, null, 'ruleset1')

    expect(event.socialDistancingRulesetKey).toBe('ruleset1')
})
