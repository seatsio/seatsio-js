const testUtils = require('../testUtils.js')
const SocialDistancingRuleset = require('../../src/Charts/SocialDistancingRuleset.js')
const TableBookingConfig = require('../../src/Events/TableBookingConfig')

test('should check that only chart key is required', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey)

    expect(event.key).toBeTruthy()
    expect(event.id).toBeTruthy()
    expect(event.chartKey).toBe(chartKey)
    expect(event.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    expect(event.supportsBestAvailable).toBe(true)
    expect(event.createdOn).toBeInstanceOf(Date)
    expect(event.forSaleConfig).toBeFalsy()
    expect(event.updatedOn).toBeFalsy()
    expect(event.categories).toEqual(testUtils.testChartCategories)
})

test('should pass in event key as a create() param', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const event = await client.events.create(chart.key, 'eventKey')

    expect(event.key).toBe('eventKey')
})

test('supports tableBookingConfig custom', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)
    const tableBookingConfig = TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' })

    const event = await client.events.create(chartKey, null, tableBookingConfig)

    expect(event.key).toBeTruthy()
    expect(event.tableBookingConfig).toEqual(tableBookingConfig)
})

test('supports tableBookingConfig inherit', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, null, TableBookingConfig.inherit())

    expect(event.key).toBeTruthy()
    expect(event.tableBookingConfig).toEqual(TableBookingConfig.inherit())
})

test('it supports a social distancing ruleset key', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = { ruleset1: SocialDistancingRuleset.ruleBased('My ruleset').build() }
    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)

    const event = await client.events.create(chart.key, null, null, 'ruleset1')

    expect(event.socialDistancingRulesetKey).toBe('ruleset1')
})

test('it supports object categories', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, null, null, null, { 'A-1': 10 })

    expect(event.objectCategories).toEqual({ 'A-1': 10 })
})
