// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'
import { SeasonParams } from '../../src/Seasons/SeasonParams'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'
import { SocialDistancingRuleset } from '../../src/Charts/SocialDistancingRuleset.js'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('chart key is required', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const season = await client.seasons.create(chartKey)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.partialSeasonKeys.length).toBe(0)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.events.length).toBe(0)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.id).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.key).toBe(season.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.chartKey).toBe(chartKey)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.supportsBestAvailable).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.createdOn).toBeInstanceOf(Date)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.forSaleConfig).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.updatedOn).toBeFalsy()
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('key can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const season = await client.seasons.create(chart.key, new SeasonParams().key('aSeason'))

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.key).toBe('aSeason')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('number of events can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const season = await client.seasons.create(chart.key, new SeasonParams().numberOfEvents(2))

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.events.length).toBe(2)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('event keys can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const season = await client.seasons.create(chart.key, new SeasonParams().eventKeys(['event1', 'event2']))

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.events.map((event: any) => event.key)).toEqual(['event1', 'event2'])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('table booking config can be passed in', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const tableBookingConfig = TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' })

    const season = await client.seasons.create(chartKey, new SeasonParams().tableBookingConfig(tableBookingConfig))

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.tableBookingConfig).toEqual(tableBookingConfig)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('social distancing ruleset key can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = { ruleset1: SocialDistancingRuleset.ruleBased('My ruleset').build() }
    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)

    const season = await client.seasons.create(chart.key, new SeasonParams().socialDistancingRulesetKey('ruleset1'))

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(season.socialDistancingRulesetKey).toBe('ruleset1')
})
