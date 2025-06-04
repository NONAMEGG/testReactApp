import type { TTaskPriority } from './taskPriority';
import type { TTaskStatus } from './taskStatus';

export type Filter = (by: TTaskPriority | TTaskStatus) => void;