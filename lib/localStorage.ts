import { Todo } from '@/types/todo';

const TODO_STORAGE_KEY = 'ia-master-os-todos';

export const todoStorage = {
  getTodos: (): Todo[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(TODO_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading todos from localStorage:', error);
      return [];
    }
  },

  saveTodos: (todos: Todo[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  },

  clearTodos: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(TODO_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing todos from localStorage:', error);
    }
  },
};
