export type error = {
    severity: string;
    message: string;
}

export type errors<T> = {
    [Key: string]: T
}

export type ErrorSummaryTableProp = {
    errors: errors<error> | null;
}