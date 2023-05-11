export class ChartValidation {
    errors: any;
    warnings: any;
    constructor (validation: any) {
        this.errors = validation.errors
        this.warnings = validation.warnings
    }
}
