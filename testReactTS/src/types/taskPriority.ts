export const TaskPriority = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
} as const;

export type TTaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];