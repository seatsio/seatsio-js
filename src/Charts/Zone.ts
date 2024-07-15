export interface ZoneJson {
    key: string
    label: string
}

export class Zone {
    private readonly key: string
    private readonly label: string

    constructor (key: string, label: string) {
        this.key = key
        this.label = label
    }

    getKey () {
        return this.key
    }

    getLabel () {
        return this.label
    }

    static fromJson (zone: ZoneJson) {
        return new Zone(zone.key, zone.label)
    }
}
