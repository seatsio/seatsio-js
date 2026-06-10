import { TableBookingConfig } from './TableBookingConfig.js'
import { Category } from '../Charts/Category.js'

export abstract class AbstractEventParams {
    key?: string
    tableBookingConfig?: TableBookingConfig
    objectCategories?: object
    categories?: Category[]
    name?: string

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
}
