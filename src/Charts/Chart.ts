import {EventDeserializer} from '../Events/EventDeserializer'
import {ChartValidation} from './ChartValidation'
import {SocialDistancingRuleset} from './SocialDistancingRuleset.js'

export class Chart {
    archived: any;
    draftVersionThumbnailUrl: any;
    events: any;
    id: any;
    key: any;
    name: any;
    publishedVersionThumbnailUrl: any;
    socialDistancingRulesets: any;
    status: any;
    tags: any;
    validation: any;

    /**
     * @param {object} chart
     */
    constructor(chart: any) {
        this.name = chart.name
        this.id = chart.id
        this.key = chart.key
        this.status = chart.status
        this.tags = chart.tags
        this.publishedVersionThumbnailUrl = chart.publishedVersionThumbnailUrl
        this.draftVersionThumbnailUrl = chart.draftVersionThumbnailUrl || null
        this.events = chart.events ? chart.events.map((event: any) => new EventDeserializer().fromJson(event)) : []
        this.archived = chart.archived
        if (chart.validation) this.validation = new ChartValidation(chart.validation)
        this.socialDistancingRulesets = Chart.socialDistancingRulesetsFromJson(chart.socialDistancingRulesets)
    }

    static socialDistancingRulesetsFromJson(json: any) {
        if (json === undefined) {
            return undefined
        }

        const result = {}
        for (const key in json) {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            result[key] = SocialDistancingRuleset.fromJson(json[key])
        }
        return result
    }
}
