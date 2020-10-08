class SocialDistancingRuleset {
    constructor (index, name, numberOfDisabledSeatsToTheSides, disableSeatsInFrontAndBehind, numberOfDisabledAisleSeats, maxGroupSize, maxOccupancyAbsolute, maxOccupancyPercentage, fixedGroupLayout, disabledSeats, enabledSeats) {
        this.index = index
        this.name = name
        this.numberOfDisabledSeatsToTheSides = numberOfDisabledSeatsToTheSides
        this.disableSeatsInFrontAndBehind = disableSeatsInFrontAndBehind
        this.numberOfDisabledAisleSeats = numberOfDisabledAisleSeats
        this.maxGroupSize = maxGroupSize
        this.maxOccupancyAbsolute = maxOccupancyAbsolute
        this.maxOccupancyPercentage = maxOccupancyPercentage
        this.fixedGroupLayout = fixedGroupLayout
        this.disabledSeats = disabledSeats
        this.enabledSeats = enabledSeats
    }

    static fixed (index, name, disabledSeats) {
        return new SocialDistancingRuleset(index, name, undefined, undefined, undefined, undefined, undefined, undefined, true, disabledSeats, undefined)
    }

    static ruleBased (index, name, numberOfDisabledSeatsToTheSides, disableSeatsInFrontAndBehind, numberOfDisabledAisleSeats, maxGroupSize, maxOccupancyAbsolute, maxOccupancyPercentage, disabledSeats, enabledSeats) {
        return new SocialDistancingRuleset(index, name, numberOfDisabledSeatsToTheSides, disableSeatsInFrontAndBehind, numberOfDisabledAisleSeats, maxGroupSize, maxOccupancyAbsolute, maxOccupancyPercentage, false, disabledSeats, enabledSeats)
    }

    static fromJson (json) {
        return new SocialDistancingRuleset(
            json.index,
            json.name,
            json.numberOfDisabledSeatsToTheSides,
            json.disableSeatsInFrontAndBehind,
            json.numberOfDisabledAisleSeats,
            json.maxGroupSize,
            json.maxOccupancyAbsolute,
            json.maxOccupancyPercentage,
            json.fixedGroupLayout,
            json.disabledSeats,
            json.enabledSeats
        )
    }
}

module.exports = SocialDistancingRuleset
