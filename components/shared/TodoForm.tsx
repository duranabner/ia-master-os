'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onAddTodo: (title: string, description?: string, priority?: 'low' | 'medium' | 'high') => void;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTodo(title, description || undefined, priority);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Adicione uma nova tarefa..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={!title.trim()}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Adicionar
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-2">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição (opcional)"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
          />

          <div className="flex gap-3">
            <label className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Prioridade:</span>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </label>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="ml-auto px-4 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
