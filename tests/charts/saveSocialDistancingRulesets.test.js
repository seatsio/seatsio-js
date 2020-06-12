const testUtils = require('../testUtils.js')
const SocialDistancingRuleset = require('../../src/Charts/SocialDistancingRuleset.js')

test('should save rulesets', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const rulesets = {
        ruleset1: new SocialDistancingRuleset(0, 'My first ruleset', 1, true, 2, 1, ['A-1'], ['A-2']),
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
            numberOfDisabledSeatsToTheSides: 1
        },
        ruleset2: {
            index: 1,
            name: 'My second ruleset',
            disableSeatsInFrontAndBehind: false,
            disabledSeats: [],
            enabledSeats: [],
            maxGroupSize: 0,
            numberOfDisabledAisleSeats: 0,
            numberOfDisabledSeatsToTheSides: 0
        }
    })
})
