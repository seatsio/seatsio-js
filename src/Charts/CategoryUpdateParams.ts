export class CategoryUpdateParams {
    label?: string
    color?: string
    accessible?: boolean

    withLabel (label: string) {
        this.label = label
        return this
    }

    withColor (color: string) {
        this.color = color
        return this
    }

    withAccessible (accessible: boolean) {
        this.accessible = accessible
        return this
    }

    serialize () {
        return {
            label: this.label,
            color: this.color,
            accessible: this.accessible
        }
    }
}
