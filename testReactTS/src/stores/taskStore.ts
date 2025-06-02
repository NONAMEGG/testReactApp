import { create } from 'zustand';
import type Task from '../interfaces/task.interface';
import type { TTaskStatus } from '../types/taskStatus';
import type { TTaskPriority } from '../types/taskPriority';

interface TaskStore {
  tasks: Task[];
  create: (id: number, title: string, status?: TTaskStatus, priority?: TTaskPriority, description?: string) => void;
  deleteByIds: (ids: number[]) => void;
  getByStatus: (status: string) => Task[];
  getByPriority: (priority: string) => Task[];
  getAll: () => Task[];
  deleteAll: () => void;
  getLastId: () => number;
  updateTask: (id: number, description: string, title?: string, status?: TTaskStatus, priority?: TTaskPriority) => void;
  getById: (id: number) => Task | undefined;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [
    {
      id: 1,
      title: 'Sample Task 1',
      createdAt: new Date(),
      description: 'This is a sample task description.',
      status: 'PENDING',
      priority: 'LOW',
    },
    {
      id: 2,
      title: 'Sample Task 2',
      createdAt: new Date(),
      description: 'This is another sample task description.',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
    },
  ],
  create: (id: number, title: string, status?: TTaskStatus, priority?: TTaskPriority, description?: string): void => {
    const newTask: Task = {
      id: id,
      title: title,
      createdAt: new Date(),
      description: description || '',
      status: status || 'PENDING',
      priority: priority || 'LOW',
    };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
  deleteByIds: (ids: number[]) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => !ids.includes(task.id)),
    }));
  },
  getLastId: () => {
    const tasks = get().tasks;
    return tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0;
  },
  getById: (id: number) => {
    return get().tasks.find((task) => task.id === id);
  },
  getByStatus: (status: string) => {
    return get().tasks.filter((task) => task.status === status);
  },
  getByPriority: (priority: string) => {
    return get().tasks.filter((task) => task.priority === priority);
  },
  getAll: () => {
    return get().tasks;
  },
  deleteAll: () => set({ tasks: [] }),
  updateTask: (id: number, description: string, title?: string, status?: TTaskStatus, priority?: TTaskPriority) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        return task.id === id
          ? { ...task,
             title: title || task.title, status: status || task.status,
              priority: priority || task.priority, 
              description: description }
          : task;
      }
        
      ),
    }));
  }
}));