class ChartValidationSettings {
    /**
     * @param {string} validateDuplicateLabels
     * @param {string} validateObjectsWithoutCategories
     * @param {string} validateUnlabelledObjects
     */
    constructor(validateDuplicateLabels, validateObjectsWithoutCategories, validateUnlabelledObjects) {
        this.VALIDATE_DUPLICATE_LABELS = validateDuplicateLabels;
        this.VALIDATE_OBJECTS_WITHOUT_CATEGORIES = validateObjectsWithoutCategories;
        this.VALIDATE_UNLABELED_OBJECTS = validateUnlabelledObjects;
    }
}

module.exports = ChartValidationSettings;