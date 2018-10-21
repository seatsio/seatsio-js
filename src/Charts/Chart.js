class Chart {
  constructor(name, id, key, status, tags, publishedVersionThumbnailUrl, draftVersionThumbnailUrl, events, archived ){
    this.name = name;
    this.id = id;
    this.key = key;
    this.status = status;
    this.tags = tags;
    this.publishedVersionThumbnailUrl = publishedVersionThumbnailUrl
    this.draftVersionThumbnailUrl = draftVersionThumbnailUrl;
    this.events = events;
    this.archived = archived;
  }

  static create(){
    return Object.create(this.prototype);
  }
}

module.exports = Chart;
