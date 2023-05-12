export class Region {
    url: any
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

    constructor (url: any) {
        this.url = url
    }

    static urlForId (id: any) {
        return 'https://api-{region}.seatsio.net'.replace('{region}', id)
    }
}
