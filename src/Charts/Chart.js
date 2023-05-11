import { EventDeserializer } from '../Events/EventDeserializer'
import { ChartValidation } from './ChartValidation'
import { SocialDistancingRuleset } from './SocialDistancingRuleset.js'

export class Chart {
    /**
     * @param {object} chart
     */
    constructor (chart) {
        this.name = chart.name
        this.id = chart.id
        this.key = chart.key
        this.status = chart.status
        this.tags = chart.tags
        this.publishedVersionThumbnailUrl = chart.publishedVersionThumbnailUrl
        this.draftVersionThumbnailUrl = chart.draftVersionThumbnailUrl || null
        this.events = chart.events ? chart.events.map(event => new EventDeserializer().fromJson(event)) : []
        this.archived = chart.archived
        if (chart.validation) this.validation = new ChartValidation(chart.validation)
        this.socialDistancingRulesets = Chart.socialDistancingRulesetsFromJson(chart.socialDistancingRulesets)
    }

    static socialDistancingRulesetsFromJson (json) {
        if (json === undefined) {
            return undefined
        }

        const result = {}
        for (const key in json) {
            result[key] = SocialDistancingRuleset.fromJson(json[key])
        }
        return result
    }
}
