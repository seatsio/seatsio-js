class Category {
    constructor(key, label, color){
        this.key = key;
        this.label = label;
        this.color = color;
    }

    setKey(key){
        this.key = key;
        return this;
    }

    setLabel(label){
        this.label = label ;
        return this;
    }

    setColor(color){
        this.color = color;
        return this;
    }
}

module.exports = Category;
