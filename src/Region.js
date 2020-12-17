class Region {
    static US () {
        return new Region(Region.urlForId('us'))
    }

    static EU () {
        return new Region(Region.urlForId('eu'))
    }

    constructor (url) {
        this.url = url
    }

    static urlForId (id) {
        return 'https://api-{region}.seatsio.net'.replace('{region}', id)
    }
}

module.exports = Region
