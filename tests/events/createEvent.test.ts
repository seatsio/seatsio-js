import { TestUtils } from '../testUtils'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'
import { Category } from '../../src/Charts/Category'
import { SocialDistancingRuleset } from '../../src/Charts/SocialDistancingRuleset'

test('should check that only chart key is required', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey)

    expect(event.key).toBeTruthy()
    expect(event.id).toBeTruthy()
    expect(event.chartKey).toBe(chartKey)
    expect(event.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    expect(event.supportsBestAvailable).toBe(true)
    expect(event.createdOn).toBeInstanceOf(Date)
    expect(event.forSaleConfig).toBeNull()
    expect(event.updatedOn).toBeNull()
    expect(event.categories).toEqual(TestUtils.testChartCategories)
})

test('should pass in event key as a create() param', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const event = await client.events.create(chart.key, 'eventKey')

    expect(event.key).toBe('eventKey')
})

test('supports tableBookingConfig custom', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const tableBookingConfig = TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' })

    const event = await client.events.create(chartKey, null, tableBookingConfig)

    expect(event.key).toBeTruthy()
    expect(event.tableBookingConfig).toEqual(tableBookingConfig)
})

test('supports tableBookingConfig inherit', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, null, TableBookingConfig.inherit())

    expect(event.key).toBeTruthy()
    expect(event.tableBookingConfig).toEqual(TableBookingConfig.inherit())
})

test('it supports a social distancing ruleset key', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = { ruleset1: SocialDistancingRuleset.ruleBased('My ruleset').build() }
    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)

    const event = await client.events.create(chart.key, null, null, 'ruleset1')

    expect(event.socialDistancingRulesetKey).toBe('ruleset1')
})

test('it supports object categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, null, null, null, { 'A-1': 10 })

    expect(event.objectCategories).toEqual({ 'A-1': 10 })
})

test('it supports categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const eventCategory = new Category('eventCat1', 'Event Level Category', '#AAABBB', false)

    const event = await client.events.create(chartKey, null, null, null, null, [eventCategory])

    expect(event.categories!.length).toEqual(4) // 3 from sampleChart.json, 1 event level category
    expect(event.categories!.filter((cat: Category) => cat.key === 'eventCat1').length).toEqual(1)
    expect(event.categories!.filter((cat: Category) => cat.key === 'eventCat1')[0].label).toEqual('Event Level Category')
    expect(event.categories!.filter((cat: Category) => cat.key === 'eventCat1')[0].color).toEqual('#AAABBB')
})