'use client';

import { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';
import { Filter } from 'lucide-react';
import { useState } from 'react';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

type FilterType = 'all' | 'active' | 'completed';

export function TodoList({ todos, onToggle, onDelete, onUpdate }: TodoListProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodos = todos.filter((todo) => !todo.completed).length;
  const completedTodos = todos.filter((todo) => todo.completed).length;

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Nenhuma tarefa ainda
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Comece adicionando uma nova tarefa acima
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <Filter size={18} className="text-gray-600 dark:text-gray-400" />
        <div className="flex gap-2">
          {[
            { value: 'all' as FilterType, label: 'Todas', count: todos.length },
            { value: 'active' as FilterType, label: 'Ativas', count: activeTodos },
            { value: 'completed' as FilterType, label: 'Concluídas', count: completedTodos },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>Nenhuma tarefa {filter !== 'all' ? `${filter === 'active' ? 'ativa' : 'concluída'}` : ''}</p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
}
