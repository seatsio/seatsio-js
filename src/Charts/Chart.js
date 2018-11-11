class Chart {
    constructor(name, id, key, status, tags, publishedVersionThumbnailUrl, draftVersionThumbnailUrl = null, events = null, archived) {
        /* string */
        this.name = name;
        /* int */
        this.id = id;
        /* string */
        this.key = key;
        /* string */
        this.status = status;
        /* [string] */
        this.tags = tags;
        /* string */
        this.publishedVersionThumbnailUrl = publishedVersionThumbnailUrl;
        /* string */
        this.draftVersionThumbnailUrl = draftVersionThumbnailUrl;
        /* [Event] */
        this.events = events;
        /* boolean */
        this.archived = archived;
    }
}

module.exports = Chart;
