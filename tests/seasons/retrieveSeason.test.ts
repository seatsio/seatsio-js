// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'
import { SeasonParams } from '../../src/Seasons/SeasonParams'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('retrieve season', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey, new SeasonParams().eventKeys(['event1', 'event2']))
    const partialSeason1 = await client.seasons.createPartialSeason(season.key)
    const partialSeason2 = await client.seasons.createPartialSeason(season.key)

    const retrievedSeason = await client.seasons.retrieve(season.key)

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
})
