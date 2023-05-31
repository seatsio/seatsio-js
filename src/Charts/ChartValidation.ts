import { Dict } from '../Dict'

export class ChartValidation {
    errors: string[]
    warnings: string[]

    constructor (json: Dict<any>) {
        this.errors = json.errors
        this.warnings = json.warnings
    }
}
