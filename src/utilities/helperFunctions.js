import LabelClasses from '../Common/Labels'
export class HelperFunctions {
    /**
     * @param data
     * @returns {Labels}
     */
    static labelCreator (data) {
        let labels = {}
        if (data.labels.parent) {
            labels = new LabelClasses.Labels(new LabelClasses.LabelAndType(data.labels.own.label, data.labels.own.type), new LabelClasses.LabelAndType(data.labels.parent.label, data.labels.parent.type))
        } else {
            labels = new LabelClasses.Labels(new LabelClasses.LabelAndType(data.labels.own.label, data.labels.own.type))
        }
        if (data.labels.section) {
            labels.section = data.labels.section
        }

        return labels
    }
}
