import { TableBookingConfig } from './TableBookingConfig'
import { Category } from '../Charts/Category'
import { LocalDate } from '../LocalDate'

export abstract class AbstractEventParams {
    key?: string
    tableBookingConfig?: TableBookingConfig
    objectCategories?: object
    categories?: Category[]
    name?: string
    date?: LocalDate

    withKey (key: string) {
        this.key = key
        return this
    }

    withTableBookingConfig (tableBookingConfig: TableBookingConfig) {
        this.tableBookingConfig = tableBookingConfig
        return this
    }

    withObjectCategories (objectCategories: object) {
        this.objectCategories = objectCategories
        return this
    }

    withCategories (categories: Category[]) {
        this.categories = categories
        return this
    }

    withName (name: string) {
        this.name = name
        return this
    }

    withDate (date: LocalDate) {
        this.date = date
        return this
    }
}
