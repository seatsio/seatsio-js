class Chart {

    /**
     * @param {string} name
     * @param {number} id
     * @param {string} key
     * @param {string} status
     * @param {String[]} tags
     * @param {string} publishedVersionThumbnailUrl
     * @param {string} draftVersionThumbnailUrl
     * @param {Event[]} events
     * @param {boolean} archived
     */
    constructor(name, id, key, status, tags, publishedVersionThumbnailUrl, draftVersionThumbnailUrl = null, events = null, archived) {
        this.name = name;
        this.id = id;
        this.key = key;
        this.status = status;
        this.tags = tags;
        this.publishedVersionThumbnailUrl = publishedVersionThumbnailUrl;
        this.draftVersionThumbnailUrl = draftVersionThumbnailUrl;
        this.events = events;
        this.archived = archived;
    }
}

module.exports = Chart;
