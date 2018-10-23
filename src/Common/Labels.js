class Labels{
  constructor(own, parent, section, entrance){
    this.own = own;
    this.parent = parent;
    this.section = section;
    this.entrance = entrance;
  }

  static create(){
    return Object.create(this.prototype);
  }
}

class LabelAndType{
  constructor(type, label){
    this.type = type;
    this.label = label;
  }

  static create(){
    return Object.create(this.prototype);
  }
}

class Entrance{
  constructor(label){
    this.label = label ;
  }

  static create(){
    return Object.create(this.prototype);
  }
}

module.exports = Labels;
module.exports = LabelAndType;
module.exports = Entrance;
