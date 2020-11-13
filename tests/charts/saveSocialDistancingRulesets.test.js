const testUtils = require('../testUtils.js')
const SocialDistancingRuleset = require('../../src/Charts/SocialDistancingRuleset.js')

test('should save rulesets', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const ruleset1 = SocialDistancingRuleset.ruleBased('My first ruleset')
        .setIndex(0)
        .setNumberOfDisabledSeatsToTheSides(1)
        .setDisableSeatsInFrontAndBehind(true)
        .setDisableDiagonalSeatsInFrontAndBehind(true)
        .setNumberOfDisabledAisleSeats(2)
        .setMaxGroupSize(1)
        .setMaxOccupancyPercentage(10)
        .setOneGroupPerTable(true)
        .setDisabledSeats(['A-1'])
        .setEnabledSeats(['A-2'])
        .build()

    const ruleset2 = SocialDistancingRuleset.fixed('My second ruleset')
        .setIndex(1)
        .setDisabledSeats(['A-1'])
        .build()

    await client.charts.saveSocialDistancingRulesets(chart.key, { ruleset1: ruleset1, ruleset2: ruleset2 })

    const retrievedChart = await client.charts.retrieve(chart.key)
    expect(retrievedChart.socialDistancingRulesets).toEqual({
        ruleset1: {
            index: 0,
            name: 'My first ruleset',
            disableSeatsInFrontAndBehind: true,
            disableDiagonalSeatsInFrontAndBehind: true,
            disabledSeats: ['A-1'],
            enabledSeats: ['A-2'],
            maxGroupSize: 1,
            numberOfDisabledAisleSeats: 2,
            numberOfDisabledSeatsToTheSides: 1,
            maxOccupancyAbsolute: 0,
            maxOccupancyPercentage: 10,
            oneGroupPerTable: true,
            fixedGroupLayout: false
        },
        ruleset2: {
            index: 1,
            name: 'My second ruleset',
            disableSeatsInFrontAndBehind: false,
            disableDiagonalSeatsInFrontAndBehind: false,
            disabledSeats: ['A-1'],
            enabledSeats: [],
            maxGroupSize: 0,
            numberOfDisabledAisleSeats: 0,
            numberOfDisabledSeatsToTheSides: 0,
            maxOccupancyAbsolute: 0,
            maxOccupancyPercentage: 0,
            oneGroupPerTable: false,
            fixedGroupLayout: true
        }
    })
})
