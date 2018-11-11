class ChartValidationSettings{
    constructor(validateDuplicateLabels, validateObjectsWithoutCategories, validateUnlabelledObjects){
        /* string */
        this.VALIDATE_DUPLICATE_LABELS = validateDuplicateLabels;
        /* string */
        this.VALIDATE_OBJECTS_WITHOUT_CATEGORIES = validateObjectsWithoutCategories;
        /* string */
        this.VALIDATE_UNLABELED_OBJECTS = validateUnlabelledObjects;
    }
}

module.exports = ChartValidationSettings;