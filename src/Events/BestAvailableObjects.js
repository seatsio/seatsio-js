class BestAvailableObjects {
    constructor(objects, labels, nextToEachOther){
        /* [string] */
        this.objects = objects;
        /* [Common/Label] */
        this.labels = labels;
        /* boolean */
        this.nextToEachOther = nextToEachOther;
    }
}

module.exports = BestAvailableObjects;