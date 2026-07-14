'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo } from '@/types/todo';
import { todoStorage } from '@/lib/localStorage';
import { generateId } from '@/lib/utils';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // Load todos from localStorage on mount
  useEffect(() => {
    const loadedTodos = todoStorage.getTodos();
    setTodos(loadedTodos);
    setLoading(false);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      todoStorage.saveTodos(todos);
    }
  }, [todos, loading]);

  const addTodo = useCallback(
    (title: string, description?: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
      const newTodo: Todo = {
        id: generateId(),
        title,
        description,
        completed: false,
        priority,
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTodos((prev) => [newTodo, ...prev]);
    },
    []
  );

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    loading,
  };
};
