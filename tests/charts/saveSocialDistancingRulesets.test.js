const testUtils = require('../testUtils.js')
const SocialDistancingRuleset = require('../../src/Charts/SocialDistancingRuleset.js')

test('should save rulesets', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = {
        ruleset1: new SocialDistancingRuleset(0, 'My first ruleset', 1, true, 2, 1, 10, 0, true, false, ['A-1'], ['A-2']),
        ruleset2: new SocialDistancingRuleset(1, 'My second ruleset')
    }

    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)

    const retrievedChart = await client.charts.retrieve(chart.key)
    expect(retrievedChart.socialDistancingRulesets).toEqual({
        ruleset1: {
            index: 0,
            name: 'My first ruleset',
            disableSeatsInFrontAndBehind: true,
            disabledSeats: ['A-1'],
            enabledSeats: ['A-2'],
            maxGroupSize: 1,
            numberOfDisabledAisleSeats: 2,
            numberOfDisabledSeatsToTheSides: 1,
            maxOccupancyAbsolute: 10,
            maxOccupancyPercentage: 0,
            oneGroupPerTable: true,
            fixedGroupLayout: false
        },
        ruleset2: {
            index: 1,
            name: 'My second ruleset',
            disableSeatsInFrontAndBehind: false,
            disabledSeats: [],
            enabledSeats: [],
            maxGroupSize: 0,
            numberOfDisabledAisleSeats: 0,
            numberOfDisabledSeatsToTheSides: 0,
            maxOccupancyAbsolute: 0,
            maxOccupancyPercentage: 0,
            oneGroupPerTable: false,
            fixedGroupLayout: false
        }
    })
})

test('should save fixed ruleset', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = {
        ruleset1: SocialDistancingRuleset.fixed(0, 'My first ruleset', ['A-1'])
    }

    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)

    const retrievedChart = await client.charts.retrieve(chart.key)
    expect(retrievedChart.socialDistancingRulesets).toEqual({
        ruleset1: {
            index: 0,
            name: 'My first ruleset',
            disableSeatsInFrontAndBehind: false,
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

test('should save rule based ruleset', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = {
        ruleset1: SocialDistancingRuleset.ruleBased(0, 'My first ruleset', 1, true, 2, 1, 10, 0, true, ['A-1'], ['A-2'])
    }

    await client.charts.saveSocialDistancingRulesets(chart.key, rulesets)

    const retrievedChart = await client.charts.retrieve(chart.key)
    expect(retrievedChart.socialDistancingRulesets).toEqual({
        ruleset1: {
            index: 0,
            name: 'My first ruleset',
            disableSeatsInFrontAndBehind: true,
            disabledSeats: ['A-1'],
            enabledSeats: ['A-2'],
            maxGroupSize: 1,
            numberOfDisabledAisleSeats: 2,
            numberOfDisabledSeatsToTheSides: 1,
            maxOccupancyAbsolute: 10,
            maxOccupancyPercentage: 0,
            oneGroupPerTable: true,
            fixedGroupLayout: false
        }
    })
})
