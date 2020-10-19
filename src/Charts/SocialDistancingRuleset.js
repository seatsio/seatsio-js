class SocialDistancingRuleset {
    constructor (index, name, numberOfDisabledSeatsToTheSides, disableSeatsInFrontAndBehind, numberOfDisabledAisleSeats, maxGroupSize, maxOccupancyAbsolute, maxOccupancyPercentage,
        oneGroupPerTable, fixedGroupLayout, disabledSeats, enabledSeats) {
        this.index = index
        this.name = name
        this.numberOfDisabledSeatsToTheSides = numberOfDisabledSeatsToTheSides
        this.disableSeatsInFrontAndBehind = disableSeatsInFrontAndBehind
        this.numberOfDisabledAisleSeats = numberOfDisabledAisleSeats
        this.maxGroupSize = maxGroupSize
        this.maxOccupancyAbsolute = maxOccupancyAbsolute
        this.maxOccupancyPercentage = maxOccupancyPercentage
        this.oneGroupPerTable = oneGroupPerTable
        this.fixedGroupLayout = fixedGroupLayout
        this.disabledSeats = disabledSeats
        this.enabledSeats = enabledSeats
    }

    static fixed (index, name, disabledSeats) {
        return new SocialDistancingRuleset(index, name, undefined, undefined, undefined, undefined, undefined, undefined, false, true, disabledSeats, undefined)
    }

    static ruleBased (index, name, numberOfDisabledSeatsToTheSides, disableSeatsInFrontAndBehind, numberOfDisabledAisleSeats, maxGroupSize, maxOccupancyAbsolute,
        maxOccupancyPercentage, oneGroupPerTable, disabledSeats, enabledSeats) {
        return new SocialDistancingRuleset(index, name, numberOfDisabledSeatsToTheSides, disableSeatsInFrontAndBehind, numberOfDisabledAisleSeats, maxGroupSize,
            maxOccupancyAbsolute, maxOccupancyPercentage, oneGroupPerTable, false, disabledSeats, enabledSeats)
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
            json.oneGroupPerTable,
            json.fixedGroupLayout,
            json.disabledSeats,
            json.enabledSeats
        )
    }
}

module.exports = SocialDistancingRuleset
