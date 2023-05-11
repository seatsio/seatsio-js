export class SocialDistancingRuleset {
    static fixed (name: any) {
        return new FixedSocialDistancingRulesetBuilder(name)
    }

    static ruleBased (name: any) {
        return new RuleBasedSocialDistancingRulesetBuilder(name)
    }

    static fromJson (json: any) {
        const ruleset = new SocialDistancingRuleset()
        // @ts-expect-error TS(2339): Property 'index' does not exist on type 'SocialDis... Remove this comment to see the full error message
        ruleset.index = json.index
        // @ts-expect-error TS(2339): Property 'name' does not exist on type 'SocialDist... Remove this comment to see the full error message
        ruleset.name = json.name
        // @ts-expect-error TS(2339): Property 'numberOfDisabledSeatsToTheSides' does no... Remove this comment to see the full error message
        ruleset.numberOfDisabledSeatsToTheSides = json.numberOfDisabledSeatsToTheSides
        // @ts-expect-error TS(2339): Property 'disableSeatsInFrontAndBehind' does not e... Remove this comment to see the full error message
        ruleset.disableSeatsInFrontAndBehind = json.disableSeatsInFrontAndBehind
        // @ts-expect-error TS(2339): Property 'disableDiagonalSeatsInFrontAndBehind' do... Remove this comment to see the full error message
        ruleset.disableDiagonalSeatsInFrontAndBehind = json.disableDiagonalSeatsInFrontAndBehind
        // @ts-expect-error TS(2339): Property 'numberOfDisabledAisleSeats' does not exi... Remove this comment to see the full error message
        ruleset.numberOfDisabledAisleSeats = json.numberOfDisabledAisleSeats
        // @ts-expect-error TS(2339): Property 'maxGroupSize' does not exist on type 'So... Remove this comment to see the full error message
        ruleset.maxGroupSize = json.maxGroupSize
        // @ts-expect-error TS(2339): Property 'maxOccupancyAbsolute' does not exist on ... Remove this comment to see the full error message
        ruleset.maxOccupancyAbsolute = json.maxOccupancyAbsolute
        // @ts-expect-error TS(2339): Property 'maxOccupancyPercentage' does not exist o... Remove this comment to see the full error message
        ruleset.maxOccupancyPercentage = json.maxOccupancyPercentage
        // @ts-expect-error TS(2339): Property 'oneGroupPerTable' does not exist on type... Remove this comment to see the full error message
        ruleset.oneGroupPerTable = json.oneGroupPerTable
        // @ts-expect-error TS(2339): Property 'fixedGroupLayout' does not exist on type... Remove this comment to see the full error message
        ruleset.fixedGroupLayout = json.fixedGroupLayout
        // @ts-expect-error TS(2339): Property 'disabledSeats' does not exist on type 'S... Remove this comment to see the full error message
        ruleset.disabledSeats = json.disabledSeats
        // @ts-expect-error TS(2339): Property 'enabledSeats' does not exist on type 'So... Remove this comment to see the full error message
        ruleset.enabledSeats = json.enabledSeats
        return ruleset
    }
}

class FixedSocialDistancingRulesetBuilder {
    disabledSeats: any;
    index: any;
    name: any;
    constructor (name: any) {
        this.name = name
    }

    build () {
        const ruleset = new SocialDistancingRuleset()
        // @ts-expect-error TS(2339): Property 'index' does not exist on type 'SocialDis... Remove this comment to see the full error message
        ruleset.index = this.index
        // @ts-expect-error TS(2339): Property 'name' does not exist on type 'SocialDist... Remove this comment to see the full error message
        ruleset.name = this.name
        // @ts-expect-error TS(2339): Property 'fixedGroupLayout' does not exist on type... Remove this comment to see the full error message
        ruleset.fixedGroupLayout = true
        // @ts-expect-error TS(2339): Property 'disabledSeats' does not exist on type 'S... Remove this comment to see the full error message
        ruleset.disabledSeats = this.disabledSeats
        return ruleset
    }

    setIndex (index: any) {
        this.index = index
        return this
    }

    setDisabledSeats (disabledSeats: any) {
        this.disabledSeats = disabledSeats
        return this
    }
}

class RuleBasedSocialDistancingRulesetBuilder {
    disableDiagonalSeatsInFrontAndBehind: any;
    disableSeatsInFrontAndBehind: any;
    disabledSeats: any;
    enabledSeats: any;
    index: any;
    maxGroupSize: any;
    maxOccupancyAbsolute: any;
    maxOccupancyPercentage: any;
    name: any;
    numberOfDisabledAisleSeats: any;
    numberOfDisabledSeatsToTheSides: any;
    oneGroupPerTable: any;
    constructor (name: any) {
        this.name = name
    }

    build () {
        const ruleset = new SocialDistancingRuleset()
        // @ts-expect-error TS(2339): Property 'index' does not exist on type 'SocialDis... Remove this comment to see the full error message
        ruleset.index = this.index
        // @ts-expect-error TS(2339): Property 'name' does not exist on type 'SocialDist... Remove this comment to see the full error message
        ruleset.name = this.name
        // @ts-expect-error TS(2339): Property 'numberOfDisabledSeatsToTheSides' does no... Remove this comment to see the full error message
        ruleset.numberOfDisabledSeatsToTheSides = this.numberOfDisabledSeatsToTheSides
        // @ts-expect-error TS(2339): Property 'disableSeatsInFrontAndBehind' does not e... Remove this comment to see the full error message
        ruleset.disableSeatsInFrontAndBehind = this.disableSeatsInFrontAndBehind
        // @ts-expect-error TS(2339): Property 'disableDiagonalSeatsInFrontAndBehind' do... Remove this comment to see the full error message
        ruleset.disableDiagonalSeatsInFrontAndBehind = this.disableDiagonalSeatsInFrontAndBehind
        // @ts-expect-error TS(2339): Property 'numberOfDisabledAisleSeats' does not exi... Remove this comment to see the full error message
        ruleset.numberOfDisabledAisleSeats = this.numberOfDisabledAisleSeats
        // @ts-expect-error TS(2339): Property 'maxGroupSize' does not exist on type 'So... Remove this comment to see the full error message
        ruleset.maxGroupSize = this.maxGroupSize
        // @ts-expect-error TS(2339): Property 'maxOccupancyAbsolute' does not exist on ... Remove this comment to see the full error message
        ruleset.maxOccupancyAbsolute = this.maxOccupancyAbsolute
        // @ts-expect-error TS(2339): Property 'maxOccupancyPercentage' does not exist o... Remove this comment to see the full error message
        ruleset.maxOccupancyPercentage = this.maxOccupancyPercentage
        // @ts-expect-error TS(2339): Property 'oneGroupPerTable' does not exist on type... Remove this comment to see the full error message
        ruleset.oneGroupPerTable = this.oneGroupPerTable
        // @ts-expect-error TS(2339): Property 'fixedGroupLayout' does not exist on type... Remove this comment to see the full error message
        ruleset.fixedGroupLayout = false
        // @ts-expect-error TS(2339): Property 'disabledSeats' does not exist on type 'S... Remove this comment to see the full error message
        ruleset.disabledSeats = this.disabledSeats
        // @ts-expect-error TS(2339): Property 'enabledSeats' does not exist on type 'So... Remove this comment to see the full error message
        ruleset.enabledSeats = this.enabledSeats
        return ruleset
    }

    setIndex (index: any) {
        this.index = index
        return this
    }

    setNumberOfDisabledSeatsToTheSides (numberOfDisabledSeatsToTheSides: any) {
        this.numberOfDisabledSeatsToTheSides = numberOfDisabledSeatsToTheSides
        return this
    }

    setDisableSeatsInFrontAndBehind (disableSeatsInFrontAndBehind: any) {
        this.disableSeatsInFrontAndBehind = disableSeatsInFrontAndBehind
        return this
    }

    setDisableDiagonalSeatsInFrontAndBehind (disableDiagonalSeatsInFrontAndBehind: any) {
        this.disableDiagonalSeatsInFrontAndBehind = disableDiagonalSeatsInFrontAndBehind
        return this
    }

    setNumberOfDisabledAisleSeats (numberOfDisabledAisleSeats: any) {
        this.numberOfDisabledAisleSeats = numberOfDisabledAisleSeats
        return this
    }

    setMaxGroupSize (maxGroupSize: any) {
        this.maxGroupSize = maxGroupSize
        return this
    }

    setMaxOccupancyAbsolute (maxOccupancyAbsolute: any) {
        this.maxOccupancyAbsolute = maxOccupancyAbsolute
        return this
    }

    setMaxOccupancyPercentage (maxOccupancyPercentage: any) {
        this.maxOccupancyPercentage = maxOccupancyPercentage
        return this
    }

    setOneGroupPerTable (oneGroupPerTable: any) {
        this.oneGroupPerTable = oneGroupPerTable
        return this
    }

    setDisabledSeats (disabledSeats: any) {
        this.disabledSeats = disabledSeats
        return this
    }

    setEnabledSeats (enabledSeats: any) {
        this.enabledSeats = enabledSeats
        return this
    }
}
