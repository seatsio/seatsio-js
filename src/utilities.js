const LabelClasses = require('./Common/Labels.js');

module.exports = {
    labelsCreator(data){
        let labels = {};
        for (const key of Object.keys(data.labels)) {
            if (data.labels[key].parent) {
                labels[key] = new LabelClasses.Labels(new LabelClasses.LabelAndType(data.labels[key].own.label, data.labels[key].own.type), new LabelClasses.LabelAndType(data.labels[key].parent.label, data.labels[key].parent.type));
            } else {
                labels[key] = new LabelClasses.Labels(new LabelClasses.LabelAndType(data.labels[key].own.label, data.labels[key].own.type));
            }
            if(data.labels[key].section){
                labels[key].section = data.labels[key].section;
            }
            if(data.labels[key].entrance){
                labels[key].entrance = data.labels[key].entrance;
            }

        }
        return labels;
    }
};
