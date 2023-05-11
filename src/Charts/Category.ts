export class Category {
    accessible: any;
    color: any;
    key: any;
    label: any;
    /**
     * @param {string|number} key
     * @param {string} label
     * @param {string} color
     */
    constructor (key: any, label: any, color: any, accessible = false) {
        this.key = key
        this.label = label
        this.color = color
        this.accessible = accessible
    }

    /**
     * @param {string|number} key
     * @returns {Category}
     */
    setKey (key: any) {
        this.key = key
        return this
    }

    /**
     * @param {string} label
     * @returns {Category}
     */
    setLabel (label: any) {
        this.label = label
        return this
    }

    /**
     * @param {string} color
     * @returns {Category}
     */
    setColor (color: any) {
        this.color = color
        return this
    }

    /**
     * @param {boolean} accessible
     * @returns {Category}
     */
    setAccessible (accessible: any) {
        this.accessible = accessible
        return this
    }

    static fromJson (json: any) {
        return new Category(json.key, json.label, json.color, json.accessible)
    }
}
