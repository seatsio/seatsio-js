class Chart {
    constructor(name, id, key, status, tags, publishedVersionThumbnailUrl, draftVersionThumbnailUrl = null, events = null, archived) {
        this.name = name; /* string */
        this.id = id; /* int */
        this.key = key; /* string */
        this.status = status; /* string */
        this.tags = tags; /* [string] */
        this.publishedVersionThumbnailUrl = publishedVersionThumbnailUrl; /* string */
        this.draftVersionThumbnailUrl = draftVersionThumbnailUrl; /* string */
        this.events = events; /* [Event] */
        this.archived = archived; /* boolean */
    }
}

module.exports = Chart;
