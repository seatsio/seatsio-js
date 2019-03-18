class ChartValidationSettings {
  /**
   * @param {string} validateDuplicateLabels
   * @param {string} validateObjectsWithoutCategories
   * @param {string} validateUnlabelledObjects
   * @param {string} validateFocalPoint
   * @param {string} validateObjectTypesPerCategory
   * @param {object} chartValidations
   */
  constructor (validateDuplicateLabels, validateObjectsWithoutCategories, validateUnlabelledObjects, validateFocalPoint, validateObjectTypesPerCategory, chartValidations) {
    this.VALIDATE_DUPLICATE_LABELS = validateDuplicateLabels
    this.VALIDATE_OBJECTS_WITHOUT_CATEGORIES = validateObjectsWithoutCategories
    this.VALIDATE_UNLABELED_OBJECTS = validateUnlabelledObjects
    this.VALIDATE_FOCAL_POINT = validateFocalPoint
    this.VALIDATE_OBJECT_TYPES_PER_CATEGORY = validateObjectTypesPerCategory
  }
}

module.exports = ChartValidationSettings
