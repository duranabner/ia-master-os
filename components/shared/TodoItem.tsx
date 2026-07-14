'use client';

import { Todo } from '@/types/todo';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
};

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
        todo.completed
          ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className="flex-shrink-0 mt-1 text-gray-400 hover:text-blue-500 dark:text-gray-600 dark:hover:text-blue-400 transition-colors"
      >
        {todo.completed ? (
          <CheckCircle size={20} className="text-green-500" />
        ) : (
          <Circle size={20} />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <h3
            className={`text-base font-medium ${
              todo.completed
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {todo.title}
          </h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${priorityColors[todo.priority]}`}>
            {priorityLabels[todo.priority]}
          </span>
        </div>

        {todo.description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{todo.description}</p>
        )}

        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          {todo.dueDate && (
            <span>Vencimento: {formatDate(todo.dueDate)}</span>
          )}
          <span>Criado: {formatDate(todo.createdAt)}</span>
        </div>

        {todo.tags && todo.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {todo.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 mt-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
