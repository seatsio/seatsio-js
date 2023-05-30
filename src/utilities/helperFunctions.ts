import { Labels } from '../Common/Labels'
import { LabelAndType } from '../Common/LabelAndType'

export class HelperFunctions {
    static labelCreator (json: any) {
        let labels
        if (json.labels.parent) {
            labels = new Labels(new LabelAndType(json.labels.own.label, json.labels.own.type), new LabelAndType(json.labels.parent.label, json.labels.parent.type))
        } else {
            labels = new Labels(new LabelAndType(json.labels.own.label, json.labels.own.type))
        }
        if (json.labels.section) {
            labels.setSection(json.labels.section)
        }

        return labels
    }
}
