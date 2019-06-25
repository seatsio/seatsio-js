class ChartValidationSettings {
    /**
     * @param {object} chartValidations
     */
    constructor (chartValidations) {
        this.VALIDATE_DUPLICATE_LABELS = chartValidations.VALIDATE_DUPLICATE_LABELS
        this.VALIDATE_OBJECTS_WITHOUT_CATEGORIES = chartValidations.VALIDATE_OBJECTS_WITHOUT_CATEGORIES
        this.VALIDATE_UNLABELED_OBJECTS = chartValidations.VALIDATE_UNLABELED_OBJECTS
        this.VALIDATE_FOCAL_POINT = chartValidations.VALIDATE_FOCAL_POINT
        this.VALIDATE_OBJECT_TYPES_PER_CATEGORY = chartValidations.VALIDATE_OBJECT_TYPES_PER_CATEGORY
        this.VALIDATE_EMPTY_FLOOR = chartValidations.VALIDATE_EMPTY_FLOOR
    }
}

module.exports = ChartValidationSettings
