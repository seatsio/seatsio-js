class SocialDistancingRuleset {
    constructor (index, name, numberOfDisabledSeatsToTheSides, disableSeatsInFrontAndBehind, numberOfDisabledAisleSeats, maxGroupSize, disabledSeats, enabledSeats) {
        this.index = index
        this.name = name
        this.numberOfDisabledSeatsToTheSides = numberOfDisabledSeatsToTheSides
        this.disableSeatsInFrontAndBehind = disableSeatsInFrontAndBehind
        this.numberOfDisabledAisleSeats = numberOfDisabledAisleSeats
        this.maxGroupSize = maxGroupSize
        this.disabledSeats = disabledSeats
        this.enabledSeats = enabledSeats
    }

    static fromJson (json) {
        return new SocialDistancingRuleset(
            json.index,
            json.name,
            json.numberOfDisabledSeatsToTheSides,
            json.disableSeatsInFrontAndBehind,
            json.numberOfDisabledAisleSeats,
            json.maxGroupSize,
            json.disabledSeats,
            json.enabledSeats
        )
    }
}

module.exports = SocialDistancingRuleset
