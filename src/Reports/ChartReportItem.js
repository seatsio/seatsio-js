class ChartReportItem{
  constructor(label, labels, categoryLabel, categoryKey, entrance, objectType, section, capacity){
    this.label = label;
    this.labels = labels;
    this.categoryKey = categoryKey;
    this.entrance = entrance;
    this.objectType = objectType;
    this.section = section;
    this.capacity = capacity;
  }

  static create(){
    return Object.create(this.prototype);
  }
}

module.exports ChartReportItem;
