class Region {
    static EU () {
        return new Region(Region.urlForId('eu'))
    }

    static NA () {
        return new Region(Region.urlForId('na'))
    }

    static SA () {
        return new Region(Region.urlForId('sa'))
    }

    static OC () {
        return new Region(Region.urlForId('oc'))
    }

    constructor (url) {
        this.url = url
    }

    static urlForId (id) {
        return 'https://api-{region}.seatsio.net'.replace('{region}', id)
    }
}

module.exports = Region
