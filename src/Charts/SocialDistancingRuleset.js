class SocialDistancingRuleset {
    static fixed (name) {
        return new FixedSocialDistancingRulesetBuilder(name)
    }

    static ruleBased (name) {
        return new RuleBasedSocialDistancingRulesetBuilder(name)
    }

    static fromJson (json) {
        const ruleset = new SocialDistancingRuleset()
        ruleset.index = json.index
        ruleset.name = json.name
        ruleset.numberOfDisabledSeatsToTheSides = json.numberOfDisabledSeatsToTheSides
        ruleset.disableSeatsInFrontAndBehind = json.disableSeatsInFrontAndBehind
        ruleset.disableDiagonalSeatsInFrontAndBehind = json.disableDiagonalSeatsInFrontAndBehind
        ruleset.numberOfDisabledAisleSeats = json.numberOfDisabledAisleSeats
        ruleset.maxGroupSize = json.maxGroupSize
        ruleset.maxOccupancyAbsolute = json.maxOccupancyAbsolute
        ruleset.maxOccupancyPercentage = json.maxOccupancyPercentage
        ruleset.oneGroupPerTable = json.oneGroupPerTable
        ruleset.fixedGroupLayout = json.fixedGroupLayout
        ruleset.disabledSeats = json.disabledSeats
        ruleset.enabledSeats = json.enabledSeats
        return ruleset
    }
}

class FixedSocialDistancingRulesetBuilder {
    constructor (name) {
        this.name = name
    }

    build () {
        const ruleset = new SocialDistancingRuleset()
        ruleset.index = this.index
        ruleset.name = this.name
        ruleset.fixedGroupLayout = true
        ruleset.disabledSeats = this.disabledSeats
        return ruleset
    }

    setIndex (index) {
        this.index = index
        return this
    }

    setDisabledSeats (disabledSeats) {
        this.disabledSeats = disabledSeats
        return this
    }
}

class RuleBasedSocialDistancingRulesetBuilder {
    constructor (name) {
        this.name = name
    }

    build () {
        const ruleset = new SocialDistancingRuleset()
        ruleset.index = this.index
        ruleset.name = this.name
        ruleset.numberOfDisabledSeatsToTheSides = this.numberOfDisabledSeatsToTheSides
        ruleset.disableSeatsInFrontAndBehind = this.disableSeatsInFrontAndBehind
        ruleset.disableDiagonalSeatsInFrontAndBehind = this.disableDiagonalSeatsInFrontAndBehind
        ruleset.numberOfDisabledAisleSeats = this.numberOfDisabledAisleSeats
        ruleset.maxGroupSize = this.maxGroupSize
        ruleset.maxOccupancyAbsolute = this.maxOccupancyAbsolute
        ruleset.maxOccupancyPercentage = this.maxOccupancyPercentage
        ruleset.oneGroupPerTable = this.oneGroupPerTable
        ruleset.fixedGroupLayout = false
        ruleset.disabledSeats = this.disabledSeats
        ruleset.enabledSeats = this.enabledSeats
        return ruleset
    }

    setIndex (index) {
        this.index = index
        return this
    }

    setNumberOfDisabledSeatsToTheSides (numberOfDisabledSeatsToTheSides) {
        this.numberOfDisabledSeatsToTheSides = numberOfDisabledSeatsToTheSides
        return this
    }

    setDisableSeatsInFrontAndBehind (disableSeatsInFrontAndBehind) {
        this.disableSeatsInFrontAndBehind = disableSeatsInFrontAndBehind
        return this
    }

    setDisableDiagonalSeatsInFrontAndBehind (disableDiagonalSeatsInFrontAndBehind) {
        this.disableDiagonalSeatsInFrontAndBehind = disableDiagonalSeatsInFrontAndBehind
        return this
    }

    setNumberOfDisabledAisleSeats (numberOfDisabledAisleSeats) {
        this.numberOfDisabledAisleSeats = numberOfDisabledAisleSeats
        return this
    }

    setMaxGroupSize (maxGroupSize) {
        this.maxGroupSize = maxGroupSize
        return this
    }

    setMaxOccupancyAbsolute (maxOccupancyAbsolute) {
        this.maxOccupancyAbsolute = maxOccupancyAbsolute
        return this
    }

    setMaxOccupancyPercentage (maxOccupancyPercentage) {
        this.maxOccupancyPercentage = maxOccupancyPercentage
        return this
    }

    setOneGroupPerTable (oneGroupPerTable) {
        this.oneGroupPerTable = oneGroupPerTable
        return this
    }

    setDisabledSeats (disabledSeats) {
        this.disabledSeats = disabledSeats
        return this
    }

    setEnabledSeats (enabledSeats) {
        this.enabledSeats = enabledSeats
        return this
    }
}

module.exports = SocialDistancingRuleset
