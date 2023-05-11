// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'
import { SeasonParams } from '../../src/Seasons/SeasonParams'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'

test('retrieve season', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey, new SeasonParams().eventKeys(['event1', 'event2']))
    const partialSeason1 = await client.seasons.createPartialSeason(season.key)
    const partialSeason2 = await client.seasons.createPartialSeason(season.key)

    const retrievedSeason = await client.seasons.retrieve(season.key)

        expect(retrievedSeason.key).toBeTruthy()
        expect(retrievedSeason.id).toBeTruthy()
        expect(retrievedSeason.partialSeasonKeys).toEqual([partialSeason1.key, partialSeason2.key])
        expect(retrievedSeason.events.map((e: any) => e.key)).toEqual(['event1', 'event2'])
        expect(retrievedSeason.chartKey).toBe(chartKey)
        expect(retrievedSeason.tableBookingConfig).toEqual(TableBookingConfig.inherit())
        expect(retrievedSeason.supportsBestAvailable).toBe(true)
        expect(retrievedSeason.createdOn).toBeInstanceOf(Date)
        expect(retrievedSeason.forSaleConfig).toBeFalsy()
        expect(retrievedSeason.updatedOn).toBeFalsy()
})
