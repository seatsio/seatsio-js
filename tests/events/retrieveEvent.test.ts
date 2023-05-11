import { TestUtils } from '../TestUtils'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'
import { SeasonParams } from '../../src/Seasons/SeasonParams'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should retrieve event', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const now = new Date()
    const event = await client.events.create(chartKey)

    const retrievedEvent = await client.events.retrieve(event.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.key).toBe(event.key)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.id).toBe(event.id)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.chartKey).toBe(chartKey)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.supportsBestAvailable).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.createdOn).toBeInstanceOf(Date)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.createdOn.getTime()).toBeLessThanOrEqual(now.getTime() + 5000)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.forSaleConfig).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.updatedOn).toBeNull()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.topLevelSeasonKey).toBe(undefined)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.categories).toEqual(TestUtils.testChartCategories)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('retrieve season', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey, new SeasonParams().eventKeys(['event1', 'event2']))
    const partialSeason1 = await client.seasons.createPartialSeason(season.key)
    const partialSeason2 = await client.seasons.createPartialSeason(season.key)

    const retrievedSeason = await client.events.retrieve(season.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.isSeason()).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.isTopLevelSeason).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.isPartialSeason).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.isEventInSeason).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.key).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.id).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.partialSeasonKeys).toEqual([partialSeason1.key, partialSeason2.key])
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.events.map((e: any) => e.key)).toEqual(['event1', 'event2'])
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.chartKey).toBe(chartKey)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.supportsBestAvailable).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.createdOn).toBeInstanceOf(Date)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.forSaleConfig).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.updatedOn).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.topLevelSeasonKey).toBe(undefined)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.categories).toEqual(TestUtils.testChartCategories)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('retrieve partial season', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey, new SeasonParams().eventKeys(['event1', 'event2']))
    const partialSeason1 = await client.seasons.createPartialSeason(season.key, null, ['event1', 'event2'])
    await client.seasons.createPartialSeason(season.key)

    const retrievedSeason = await client.events.retrieve(partialSeason1.key)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.isSeason()).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.isTopLevelSeason).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.isPartialSeason).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.isEventInSeason).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.key).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.id).toBeTruthy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.partialSeasonKeys).toBe(undefined)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.events.map((e: any) => e.key)).toEqual(['event1', 'event2'])
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.chartKey).toBe(chartKey)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.supportsBestAvailable).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.createdOn).toBeInstanceOf(Date)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.forSaleConfig).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.updatedOn).toBeFalsy()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedSeason.topLevelSeasonKey).toBe(season.key)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('retrieve event in season', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey, new SeasonParams().eventKeys(['event1', 'event2']))

    const retrievedEvent = await client.events.retrieve('event1')

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.isSeason()).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.isTopLevelSeason).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.isPartialSeason).toBe(false)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.isEventInSeason).toBe(true)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(retrievedEvent.topLevelSeasonKey).toBe(season.key)
})
