class Chart {
  constructor(name, id, key, status, tags, publishedVersionThumbnailUrl, draftVersionThumbnailUrl = null, events = null, archived){
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
