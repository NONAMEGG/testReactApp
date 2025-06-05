import type { TTaskPriority } from "../types/taskPriority";
import type { TTaskStatus } from "../types/taskStatus"

export interface FormInputs {
    title: string;
    description: string;
    priority: TTaskPriority;
    status: TTaskStatus;
}