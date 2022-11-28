const testUtils = require('../testUtils.js')
const SocialDistancingRuleset = require('../../src/Charts/SocialDistancingRuleset.js')
const TableBookingConfig = require('../../src/Events/TableBookingConfig')
const Category = require('../../src/Charts/Category')

test('should update event\'s chart key', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    const event = await client.events.create(chart1.key)

    await client.events.update(event.key, chart2.key)

    const retrievedEvent = await client.events.retrieve(event.key)
    const now = new Date()
    expect(retrievedEvent.chartKey).toBe(chart2.key)
    expect(retrievedEvent.updatedOn).toBeInstanceOf(Date)
    expect(retrievedEvent.updatedOn.getTime()).toBeLessThanOrEqual(now.getTime() + 5000)
    expect(retrievedEvent.updatedOn.getTime()).toBeGreaterThanOrEqual((now.getTime() - 5000))
})

test('should update event key', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.update(event.key, null, 'newKey')

    const retrievedEvent = await client.events.retrieve('newKey')
    expect(retrievedEvent.chartKey).toBe(chart.key)
    expect(retrievedEvent.key).toBe('newKey')
})

test('should update tableBookingConfig parameter of an event', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.update(event.key, null, null, TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' }))

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.chartKey).toBe(chartKey)
    expect(retrievedEvent.key).toBe(event.key)
    expect(retrievedEvent.tableBookingConfig).toEqual(TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' }))
})

test('it supports a social distancing ruleset key', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = {
        ruleset1: SocialDistancingRuleset.ruleBased('My ruleset').build(),
        ruleset2: SocialDistancingRuleset.ruleBased('Another ruleset').build()
    }
    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)
    const event = await client.events.create(chart.key, null, null, 'ruleset1')

    await client.events.update(event.key, null, null, null, 'ruleset2')

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.socialDistancingRulesetKey).toBe('ruleset2')
})

test('it supports removing the social distancing ruleset key', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = {
        ruleset1: SocialDistancingRuleset.ruleBased('My ruleset').build()
    }
    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)
    const event = await client.events.create(chart.key, null, null, 'ruleset1')

    await client.events.update(event.key, null, null, null, '')

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.socialDistancingRulesetKey).toBe(undefined)
})

test('it supports object categories', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, null, null, null, { 'A-1': 9 })

    await client.events.update(event.key, null, null, null, null, { 'A-1': 10 })

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.objectCategories).toEqual({ 'A-1': 10 })
})

test('it supports removing the object categories', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, null, null, null, { 'A-2': 9 })

    await client.events.update(event.key, null, null, null, null, { })

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.objectCategories).toBeFalsy()
})

test('it supports updating the categories', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const eventCategory = new Category('eventCat1', 'Event Level Category', '#AAABBB')
    const newEventCategory = new Category('eventCat2', 'Event Level Category 2', '#BBBCCC')
    const event = await client.events.create(chartKey, null, null, null, null, [eventCategory])

    await client.events.update(event.key, null, null, null, null, null, [newEventCategory])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.categories.length).toEqual(4) // 3 from sampleChart.json, 1 event level category
    expect(retrievedEvent.categories.filter(cat => cat.key === 'eventCat1').length).toEqual(0)
    expect(retrievedEvent.categories.filter(cat => cat.key === 'eventCat2').length).toEqual(1)
    expect(retrievedEvent.categories.filter(cat => cat.key === 'eventCat2')[0].label).toEqual('Event Level Category 2')
    expect(retrievedEvent.categories.filter(cat => cat.key === 'eventCat2')[0].color).toEqual('#BBBCCC')
})

test('it supports removing categoreis', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const eventCategory = new Category('eventCat1', 'Event Level Category', '#AAABBB')
    const event = await client.events.create(chartKey, null, null, null, null, [eventCategory])

    await client.events.update(event.key, null, null, null, null, null, [])

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.categories.length).toEqual(3) // 3 from sampleChart.json, event level category was removed
})
