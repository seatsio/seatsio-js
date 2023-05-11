import * as LabelClasses from '../Common/Labels.js'

export class HelperFunctions {
    /**
     * @param data
     * @returns {Labels}
     */
    static labelCreator (data: any) {
        let labels = {}
        if (data.labels.parent) {
            // @ts-expect-error TS(2345): Argument of type 'LabelAndType' is not assignable ... Remove this comment to see the full error message
            labels = new LabelClasses.Labels(new LabelClasses.LabelAndType(data.labels.own.label, data.labels.own.type), new LabelClasses.LabelAndType(data.labels.parent.label, data.labels.parent.type))
        } else {
            labels = new LabelClasses.Labels(new LabelClasses.LabelAndType(data.labels.own.label, data.labels.own.type))
        }
        if (data.labels.section) {
            // @ts-expect-error TS(2339): Property 'section' does not exist on type '{}'.
            labels.section = data.labels.section
        }

        return labels
    }
}
