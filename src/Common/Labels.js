class Labels{
  constructor(){
    this.own = '';
    this.parent = '';
    this.section = '';
    this.entrance = '';
  }
}

class LabelAndType{
  constructor(){
    this.type = '';
    this.label = '';
  }
}

class Entrance{
  constructor(){
    this.label = '' ;
  }
}

module.exports = {
  Labels: Labels,
  LabelAndType : LabelAndType,
  Entrance : Entrance
};
