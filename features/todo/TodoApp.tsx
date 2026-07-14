'use client';

import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from '@/components/shared/TodoForm';
import { TodoList } from '@/components/shared/TodoList';
import { CheckCircle } from 'lucide-react';

export function TodoApp() {
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    loading,
  } = useTodos();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <CheckCircle size={48} className="text-blue-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Carregando tarefas...</p>
        </div>
      </div>
    );
  }

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Minhas Tarefas</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {todos.length} tarefa{todos.length !== 1 ? 's' : ''}
          {completedCount > 0 && ` • ${completedCount} concluída${completedCount !== 1 ? 's' : ''}`}
        </p>
      </div>

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />

      {completedCount > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={clearCompleted}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            Limpar concluídas
          </button>
        </div>
      )}
    </div>
  );
}
