class ChartValidationSettings{
    constructor(validateDuplicateLabels, validateObjectsWithoutCategories, validateUnlabelledObjects){
        this.VALIDATE_DUPLICATE_LABELS = validateDuplicateLabels; /* string */
        this.VALIDATE_OBJECTS_WITHOUT_CATEGORIES = validateObjectsWithoutCategories; /* string */
        this.VALIDATE_UNLABELED_OBJECTS = validateUnlabelledObjects /* string */
    }
}

module.exports = ChartValidationSettings;