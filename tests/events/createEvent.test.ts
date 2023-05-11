import { TestUtils } from '../TestUtils'
import { SocialDistancingRuleset } from '../../src/Charts/SocialDistancingRuleset.js'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'
import { Category } from '../../src/Charts/Category'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should check that only chart key is required', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.key).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.id).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.chartKey).toBe(chartKey)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.supportsBestAvailable).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.createdOn).toBeInstanceOf(Date)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.forSaleConfig).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.updatedOn).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.categories).toEqual(TestUtils.testChartCategories)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should pass in event key as a create() param', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const event = await client.events.create(chart.key, 'eventKey')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.key).toBe('eventKey')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('supports tableBookingConfig custom', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const tableBookingConfig = TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' })

    const event = await client.events.create(chartKey, null, tableBookingConfig)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.key).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.tableBookingConfig).toEqual(tableBookingConfig)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('supports tableBookingConfig inherit', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, null, TableBookingConfig.inherit())

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.key).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.tableBookingConfig).toEqual(TableBookingConfig.inherit())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('it supports a social distancing ruleset key', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = { ruleset1: SocialDistancingRuleset.ruleBased('My ruleset').build() }
    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)

    const event = await client.events.create(chart.key, null, null, 'ruleset1')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.socialDistancingRulesetKey).toBe('ruleset1')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('it supports object categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, null, null, null, { 'A-1': 10 })

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.objectCategories).toEqual({ 'A-1': 10 })
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('it supports categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const eventCategory = new Category('eventCat1', 'Event Level Category', '#AAABBB')

    const event = await client.events.create(chartKey, null, null, null, null, [eventCategory])

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.categories.length).toEqual(4) // 3 from sampleChart.json, 1 event level category
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.categories.filter((cat: any) => cat.key === 'eventCat1').length).toEqual(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.categories.filter((cat: any) => cat.key === 'eventCat1')[0].label).toEqual('Event Level Category')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(event.categories.filter((cat: any) => cat.key === 'eventCat1')[0].color).toEqual('#AAABBB')
})
