import { LabelAndType, Labels } from '../Common/Labels'

export class HelperFunctions {
    static labelCreator (data: any) {
        let labels
        if (data.labels.parent) {
            labels = new Labels(new LabelAndType(data.labels.own.label, data.labels.own.type), new LabelAndType(data.labels.parent.label, data.labels.parent.type))
        } else {
            labels = new Labels(new LabelAndType(data.labels.own.label, data.labels.own.type))
        }
        if (data.labels.section) {
            labels.setSection(data.labels.section)
        }

        return labels
    }
}
