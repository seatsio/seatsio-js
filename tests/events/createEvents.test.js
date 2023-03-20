const testUtils = require('../testUtils.js')
const SocialDistancingRuleset = require('../../src/Charts/SocialDistancingRuleset.js')
const TableBookingConfig = require('../../src/Events/TableBookingConfig')
const Category = require('../../src/Charts/Category')
const Events = require('../../src/Events/Events')

test('should check that a minimum of one event is required', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    try {
        await client.events.createMultiple(chartKey)
    } catch (e) {
        expect(e.errors.length).toEqual(1)
        expect(e.errors[0].code).toBe('GENERAL_ERROR')
        expect(e.errors[0].message).toBe('#/events: expected minimum item count: 1, found: 0')
    }
})

test('should check that an empty object is a valid event definition', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const events = await client.events.createMultiple(chartKey, [{}])

    expect(events).toHaveLength(1)
    expect(events[0].key).toBeTruthy()
})

test('should create a single event', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const events = await client.events.createMultiple(chart.key, [
        Events.eventCreationParams('eventKey')
    ])

    expect(events).toHaveLength(1)
    expect(events[0].key).toEqual('eventKey')

    const retrievedEvent = await client.events.retrieve('eventKey')
    expect(retrievedEvent.key).toEqual('eventKey')
})

test('should create multiple events', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const events = [
        Events.eventCreationParams('eventKey1'),
        Events.eventCreationParams('eventKey2')
    ]
    const createdEvents = await client.events.createMultiple(chart.key, events)

    expect(createdEvents).toHaveLength(2)
    expect(createdEvents[0].key).toEqual('eventKey1')
    expect(createdEvents[1].key).toEqual('eventKey2')

    for (const event of events) {
        const retrievedEvent = await client.events.retrieve(event.eventKey)
        expect(retrievedEvent.key).toEqual(event.eventKey)
    }
})

test('supports tableBookingConfig custom', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)
    const tableBookingConfig = TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' })

    const events = await client.events.createMultiple(chartKey, [
        Events.eventCreationParams(null, tableBookingConfig)
    ])

    expect(events[0].key).toBeTruthy()
    expect(events[0].tableBookingConfig).toEqual(tableBookingConfig)
})

test('supports tableBookingConfig inherit', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)

    const events = await client.events.createMultiple(chartKey, [
        Events.eventCreationParams(null, TableBookingConfig.inherit())
    ])

    expect(events[0].key).toBeTruthy()
    expect(events[0].tableBookingConfig).toEqual(TableBookingConfig.inherit())
})

test('it supports a social distancing ruleset key', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = { ruleset1: SocialDistancingRuleset.ruleBased('My ruleset').build() }
    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)

    const events = await client.events.createMultiple(chart.key, [
        Events.eventCreationParams(null, null, 'ruleset1')
    ])

    expect(events[0].socialDistancingRulesetKey).toBe('ruleset1')
})

test('it supports object categories', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const events = await client.events.createMultiple(chartKey, [
        Events.eventCreationParams(null, null, null, { 'A-1': 10 })
    ])

    expect(events[0].objectCategories).toEqual({ 'A-1': 10 })
})

test('it supports categories', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const eventCategory = new Category('eventCat1', 'Event Level Category', '#AAABBB')

    const events = await client.events.createMultiple(chartKey, [
        Events.eventCreationParams(null, null, null, null, [eventCategory])
    ])

    expect(events[0].categories.length).toEqual(4) // 3 from sampleChart.json, 1 event level category
    expect(events[0].categories.filter(cat => cat.key === 'eventCat1').length).toEqual(1)
    expect(events[0].categories.filter(cat => cat.key === 'eventCat1')[0].label).toEqual('Event Level Category')
    expect(events[0].categories.filter(cat => cat.key === 'eventCat1')[0].color).toEqual('#AAABBB')
})
