export class IDs {
    own: any;
    parent: any;
    section: any;
    constructor (own: any, parent = null, section = null) {
        this.own = own
        this.parent = parent
        this.section = section
    }
}
