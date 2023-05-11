import { TestUtils } from '../TestUtils'
import { SocialDistancingRuleset } from '../../src/Charts/SocialDistancingRuleset.js'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'
import { Category } from '../../src/Charts/Category'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should update event\'s chart key', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    const event = await client.events.create(chart1.key)

    await client.events.update(event.key, chart2.key)

    const retrievedEvent = await client.events.retrieve(event.key)
    const now = new Date()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.chartKey).toBe(chart2.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.updatedOn).toBeInstanceOf(Date)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.updatedOn.getTime()).toBeLessThanOrEqual(now.getTime() + 5000)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.updatedOn.getTime()).toBeGreaterThanOrEqual((now.getTime() - 5000))
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should update event key', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.update(event.key, null, 'newKey')

    const retrievedEvent = await client.events.retrieve('newKey')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.chartKey).toBe(chart.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.key).toBe('newKey')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should update tableBookingConfig parameter of an event', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.update(event.key, null, null, TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' }))

    const retrievedEvent = await client.events.retrieve(event.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.chartKey).toBe(chartKey)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.key).toBe(event.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.tableBookingConfig).toEqual(TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' }))
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('it supports a social distancing ruleset key', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = {
        ruleset1: SocialDistancingRuleset.ruleBased('My ruleset').build(),
        ruleset2: SocialDistancingRuleset.ruleBased('Another ruleset').build()
    }
    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)
    const event = await client.events.create(chart.key, null, null, 'ruleset1')

    await client.events.update(event.key, null, null, null, 'ruleset2')

    const retrievedEvent = await client.events.retrieve(event.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.socialDistancingRulesetKey).toBe('ruleset2')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('it supports removing the social distancing ruleset key', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = {
        ruleset1: SocialDistancingRuleset.ruleBased('My ruleset').build()
    }
    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)
    const event = await client.events.create(chart.key, null, null, 'ruleset1')

    await client.events.update(event.key, null, null, null, '')

    const retrievedEvent = await client.events.retrieve(event.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.socialDistancingRulesetKey).toBe(undefined)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('it supports object categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, null, null, null, { 'A-1': 9 })

    await client.events.update(event.key, null, null, null, null, { 'A-1': 10 })

    const retrievedEvent = await client.events.retrieve(event.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.objectCategories).toEqual({ 'A-1': 10 })
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('it supports removing the object categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, null, null, null, { 'A-2': 9 })

    await client.events.update(event.key, null, null, null, null, { })

    const retrievedEvent = await client.events.retrieve(event.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.objectCategories).toBeFalsy()
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('it supports updating the categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const eventCategory = new Category('eventCat1', 'Event Level Category', '#AAABBB')
    const newEventCategory = new Category('eventCat2', 'Event Level Category 2', '#BBBCCC')
    const event = await client.events.create(chartKey, null, null, null, null, [eventCategory])

    await client.events.update(event.key, null, null, null, null, null, [newEventCategory])

    const retrievedEvent = await client.events.retrieve(event.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.categories.length).toEqual(4) // 3 from sampleChart.json, 1 event level category
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.categories.filter((cat: any) => cat.key === 'eventCat1').length).toEqual(0)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.categories.filter((cat: any) => cat.key === 'eventCat2').length).toEqual(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.categories.filter((cat: any) => cat.key === 'eventCat2')[0].label).toEqual('Event Level Category 2')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.categories.filter((cat: any) => cat.key === 'eventCat2')[0].color).toEqual('#BBBCCC')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('it supports removing categoreis', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const eventCategory = new Category('eventCat1', 'Event Level Category', '#AAABBB')
    const event = await client.events.create(chartKey, null, null, null, null, [eventCategory])

    await client.events.update(event.key, null, null, null, null, null, [])

    const retrievedEvent = await client.events.retrieve(event.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.categories.length).toEqual(3) // 3 from sampleChart.json, event level category was removed
})
