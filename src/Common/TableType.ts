export type TableType = 'bookByTable' | 'bookBySeat' | 'variableOccupancy' | 'generalAdmission'

export const TableTypes = {
    BOOK_BY_TABLE: 'bookByTable',
    BOOK_BY_SEAT: 'bookBySeat',
    VARIABLE_OCCUPANCY: 'variableOccupancy',
    GENERAL_ADMISSION: 'generalAdmission'
} as const
