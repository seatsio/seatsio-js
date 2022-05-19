class Category {
    /**
     * @param {string|number} key
     * @param {string} label
     * @param {string} color
     */
    constructor (key, label, color, accessible = false) {
        this.key = key
        this.label = label
        this.color = color
        this.accessible = accessible
    }

    /**
     * @param {string|number} key
     * @returns {Category}
     */
    setKey (key) {
        this.key = key
        return this
    }

    /**
     * @param {string} label
     * @returns {Category}
     */
    setLabel (label) {
        this.label = label
        return this
    }

    /**
     * @param {string} color
     * @returns {Category}
     */
    setColor (color) {
        this.color = color
        return this
    }

    /**
     * @param {boolean} accessible
     * @returns {Category}
     */
    setAccessible (accessible) {
        this.accessible = accessible
        return this
    }

    static fromJson (json) {
        return new Category(json.key, json.label, json.color, json.accessible)
    }
}

module.exports = Category
