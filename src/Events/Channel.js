class Channel {
    /**
     * @param {object} Channel
     */
    constructor (channel) {
        this.key = channel.key
        this.name = channel.name
        this.color = channel.color
        this.index = channel.index
        this.objects = channel.objects
    }
}

module.exports = Channel
