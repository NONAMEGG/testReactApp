import { create } from 'zustand';
import type Task from '../interfaces/task.interface';

interface TaskStore {
  tasks: Task[];
  create: (whatToCreate: Partial<Task>) => void;
  deleteByIds: (ids: number[]) => void;
  getByStatus: (status: string) => Task[];
  getByPriority: (priority: string) => Task[];
  getAll: () => Task[];
  deleteAll: () => void;
  getLastId: () => number;
  updateTask: (id: number, fieldsToUpdate: Partial<Task>) => void;
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
  create: (whatToCreate): void => {
    const newTask: Task = {
      id: whatToCreate.id || get().getLastId() + 1,
      title: whatToCreate.title || 'Task ' + (get().getLastId() + 1),
      createdAt: new Date(),
      description: whatToCreate.description || '',
      status: whatToCreate.status || 'PENDING',
      priority: whatToCreate.priority || 'LOW',
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
  updateTask: (id, fieldsToUpdate) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          if (fieldsToUpdate.title !== '') {
            return { ...task, ...fieldsToUpdate };
          } else {
            fieldsToUpdate.title = task.title;
            return { ...task, ...fieldsToUpdate };
          }
        }
        return task;
      }
      ),
    }));
  }
}));