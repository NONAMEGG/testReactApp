export const TaskStatus  = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
} as const;

export type TTaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

