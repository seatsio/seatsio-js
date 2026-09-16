export type AreaType = 'generalAdmission' | 'fixedOccupancy' | 'variableOccupancy'

export const AreaTypes = {
    GENERAL_ADMISSION: 'generalAdmission',
    FIXED_OCCUPANCY: 'fixedOccupancy',
    VARIABLE_OCCUPANCY: 'variableOccupancy'
} as const
