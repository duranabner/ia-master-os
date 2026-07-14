# Aplicação To-Do List

Aplicação de gerenciamento de tarefas com armazenamento local usando Next.js, TypeScript e Tailwind CSS.

## 🎯 Funcionalidades

- ✅ Criar novas tarefas
- ✅ Editar tarefas existentes
- ✅ Marcar tarefas como concluídas
- ✅ Deletar tarefas
- ✅ Filtrar tarefas (Todas, Ativas, Concluídas)
- ✅ Definir prioridade (Baixa, Média, Alta)
- ✅ Adicionar descrição e datas de vencimento
- ✅ Tags/Etiquetas
- ✅ Armazenamento persistente com localStorage
- ✅ Interface responsiva e modo escuro

## 📁 Estrutura de Arquivos

```
├── app/
│   └── todo/
│       └── page.tsx          # Página principal
├── components/
│   └── shared/
│       ├── TodoForm.tsx      # Formulário para adicionar tarefas
│       ├── TodoItem.tsx      # Componente individual da tarefa
│       └── TodoList.tsx      # Lista de tarefas com filtros
├── features/
│   └── todo/
│       └── TodoApp.tsx       # Componente principal da aplicação
├── hooks/
│   └── useTodos.ts           # Hook customizado para gerenciar estado
├── lib/
│   ├── localStorage.ts       # Utilitários de persistência
│   └── utils.ts              # Funções utilitárias gerais
├── types/
│   └── todo.ts               # Definições de tipos TypeScript
└── styles/
    └── animations.css        # Animações customizadas
```

## 🔧 Tipos TypeScript

### Todo

```typescript
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}
```

## 🤖 Hook: useTodos

Hook customizado que gerencia o estado das tarefas com persistência em localStorage.

```typescript
const {
  todos,           // Array de tarefas
  addTodo,         // Função para adicionar tarefa
  updateTodo,      // Função para atualizar tarefa
  deleteTodo,      // Função para deletar tarefa
  toggleTodo,      // Função para marcar como concluída
  clearCompleted,  // Função para limpar concluídas
  loading,         // Estado de carregamento
} = useTodos();
```

## 💾 localStorage

As tarefas são automaticamente salvas no localStorage sob a chave `ia-master-os-todos`. O storage é sincronizado sempre que o array de tarefas muda.

### Métodos disponíveis:

- `getTodos()` - Recupera tarefas do localStorage
- `saveTodos(todos)` - Salva tarefas no localStorage
- `clearTodos()` - Limpa todas as tarefas do localStorage

## 🎨 Componentes

### TodoForm

Formulário interativo para adicionar novas tarefas com opções de:
- Título (obrigatório)
- Descrição (opcional)
- Prioridade (Baixa, Média, Alta)

### TodoItem

Componente que exibe uma tarefa individual com:
- Checkbox para marcar como concluída
- Título e descrição
- Badge de prioridade com cores
- Datas de criação e vencimento
- Tags/Etiquetas
- Botão para deletar

### TodoList

Lista com filtros para:
- Todas as tarefas
- Tarefas ativas
- Tarefas concluídas

Exibe contadores para cada categoria.

## 🚀 Como Usar

1. Navegue até `/todo`
2. Digite o título da tarefa e clique em "Adicionar"
3. Expanda o formulário para adicionar descrição e prioridade
4. Use os filtros para visualizar diferentes categorias
5. Clique no círculo para marcar como concluída
6. Use o ícone de lixo para deletar

## 🌙 Modo Escuro

A aplicação suporta modo escuro automático baseado nas preferências do sistema.

## 📱 Responsividade

A interface é totalmente responsiva e funciona em todos os tamanhos de tela.
