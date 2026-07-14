import { TodoApp } from '@/features/todo/TodoApp';

export const metadata = {
  title: 'Minhas Tarefas - IA Master OS',
  description: 'Gerenciador de tarefas com armazenamento local',
};

export default function TodoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <TodoApp />
      </div>
    </main>
  );
}
