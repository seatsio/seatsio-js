export class Region {
    url: string
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

    constructor (url: string) {
        this.url = url
    }

    static urlForId (id: string) {
        return 'https://api-{region}.seatsio.net'.replace('{region}', id)
    }
}
