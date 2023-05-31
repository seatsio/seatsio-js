import { Dict } from '../Dict'

export type SocialDistancingRulesetJson = Dict<any>

export class SocialDistancingRuleset {
    index: number
    name: string
    numberOfDisabledSeatsToTheSides: number
    disableSeatsInFrontAndBehind: boolean
    disableDiagonalSeatsInFrontAndBehind: boolean
    numberOfDisabledAisleSeats: number
    maxGroupSize: number
    maxOccupancyAbsolute: number
    maxOccupancyPercentage: number
    oneGroupPerTable: boolean
    fixedGroupLayout: boolean
    disabledSeats: string[]
    enabledSeats: string[]

    constructor (index: number, name: string, numberOfDisabledSeatsToTheSides: number, disableSeatsInFrontAndBehind: boolean, disableDiagonalSeatsInFrontAndBehind: boolean, numberOfDisabledAisleSeats: number, maxGroupSize: number, maxOccupancyAbsolute: number, maxOccupancyPercentage: number, oneGroupPerTable: boolean, fixedGroupLayout: boolean, disabledSeats: string[], enabledSeats: string[]) {
        this.index = index
        this.name = name
        this.numberOfDisabledSeatsToTheSides = numberOfDisabledSeatsToTheSides
        this.disableSeatsInFrontAndBehind = disableSeatsInFrontAndBehind
        this.disableDiagonalSeatsInFrontAndBehind = disableDiagonalSeatsInFrontAndBehind
        this.numberOfDisabledAisleSeats = numberOfDisabledAisleSeats
        this.maxGroupSize = maxGroupSize
        this.maxOccupancyAbsolute = maxOccupancyAbsolute
        this.maxOccupancyPercentage = maxOccupancyPercentage
        this.oneGroupPerTable = oneGroupPerTable
        this.fixedGroupLayout = fixedGroupLayout
        this.disabledSeats = disabledSeats
        this.enabledSeats = enabledSeats
    }

    static fixed (name: string) {
        return new FixedSocialDistancingRulesetBuilder(name)
    }

    static ruleBased (name: string) {
        return new RuleBasedSocialDistancingRulesetBuilder(name)
    }

    static fromJson (json: Dict<any>) {
        return new SocialDistancingRuleset(
            json.index,
            json.name,
            json.numberOfDisabledSeatsToTheSides,
            json.disableSeatsInFrontAndBehind,
            json.disableDiagonalSeatsInFrontAndBehind,
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

class FixedSocialDistancingRulesetBuilder {
    disabledSeats: string[] = []
    index: number = 0
    name: string = 'a name'

    constructor (name: string) {
        this.name = name
    }

    build () {
        return new SocialDistancingRuleset(this.index, this.name, 0, false, false, 0, 0, 0, 0, false, true, this.disabledSeats, [])
    }

    setIndex (index: number) {
        this.index = index
        return this
    }

    setDisabledSeats (disabledSeats: string[]) {
        this.disabledSeats = disabledSeats
        return this
    }
}

class RuleBasedSocialDistancingRulesetBuilder {
    disableDiagonalSeatsInFrontAndBehind: boolean = false
    disableSeatsInFrontAndBehind: boolean = false
    disabledSeats: string[] = []
    enabledSeats: string[] = []
    index: number = 0
    maxGroupSize: number = 0
    maxOccupancyAbsolute: number = 0
    maxOccupancyPercentage: number = 0
    name: string
    numberOfDisabledAisleSeats: number = 0
    numberOfDisabledSeatsToTheSides: number = 0
    oneGroupPerTable: boolean = false

    constructor (name: string) {
        this.name = name
    }

    build () {
        return new SocialDistancingRuleset(
            this.index,
            this.name,
            this.numberOfDisabledSeatsToTheSides,
            this.disableSeatsInFrontAndBehind,
            this.disableDiagonalSeatsInFrontAndBehind,
            this.numberOfDisabledAisleSeats,
            this.maxGroupSize,
            this.maxOccupancyAbsolute,
            this.maxOccupancyPercentage,
            this.oneGroupPerTable,
            false,
            this.disabledSeats,
            this.enabledSeats
        )
    }

    setIndex (index: number) {
        this.index = index
        return this
    }

    setNumberOfDisabledSeatsToTheSides (numberOfDisabledSeatsToTheSides: number) {
        this.numberOfDisabledSeatsToTheSides = numberOfDisabledSeatsToTheSides
        return this
    }

    setDisableSeatsInFrontAndBehind (disableSeatsInFrontAndBehind: boolean) {
        this.disableSeatsInFrontAndBehind = disableSeatsInFrontAndBehind
        return this
    }

    setDisableDiagonalSeatsInFrontAndBehind (disableDiagonalSeatsInFrontAndBehind: boolean) {
        this.disableDiagonalSeatsInFrontAndBehind = disableDiagonalSeatsInFrontAndBehind
        return this
    }

    setNumberOfDisabledAisleSeats (numberOfDisabledAisleSeats: number) {
        this.numberOfDisabledAisleSeats = numberOfDisabledAisleSeats
        return this
    }

    setMaxGroupSize (maxGroupSize: number) {
        this.maxGroupSize = maxGroupSize
        return this
    }

    setMaxOccupancyAbsolute (maxOccupancyAbsolute: number) {
        this.maxOccupancyAbsolute = maxOccupancyAbsolute
        return this
    }

    setMaxOccupancyPercentage (maxOccupancyPercentage: number) {
        this.maxOccupancyPercentage = maxOccupancyPercentage
        return this
    }

    setOneGroupPerTable (oneGroupPerTable: boolean) {
        this.oneGroupPerTable = oneGroupPerTable
        return this
    }

    setDisabledSeats (disabledSeats: string[]) {
        this.disabledSeats = disabledSeats
        return this
    }

    setEnabledSeats (enabledSeats: string[]) {
        this.enabledSeats = enabledSeats
        return this
    }
}
