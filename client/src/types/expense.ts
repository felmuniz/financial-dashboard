/**
 * Tipos para o sistema de controle de despesas, ganhos e contas fixas
 * Design: Minimalismo Corporativo - estrutura de dados simples e clara
 */

export type ExpenseCategory = 'Alimentação' | 'Lazer' | 'Moradia' | 'Transporte' | 'Outros';
export type IncomeCategory = 'Salário' | 'Freelance' | 'Investimentos' | 'Outros';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string; // Agora aceita categorias personalizadas
  date: string; // ISO date string (YYYY-MM-DD)
  userId?: string; // ID do usuário Firebase
  createdAt?: number; // timestamp para ordenação
}

export interface Income {
  id: string;
  name: string;
  amount: number;
  category: string; // Categoria de ganho
  date: string; // ISO date string (YYYY-MM-DD)
  userId?: string; // ID do usuário Firebase
  createdAt?: number; // timestamp para ordenação
}

export interface FixedAccount {
  id: string;
  name: string;
  amount: number;
  category: string; // Categoria de conta fixa
  dueDate: number; // Dia do mês (1-31)
  isActive: boolean;
  userId?: string; // ID do usuário Firebase
  createdAt?: number; // timestamp para ordenação
}

export interface CustomCategory {
  id: string;
  name: string;
  type: 'expense' | 'income' | 'fixed'; // Tipo de categoria
  color: string; // Cor da categoria (ex: 'emerald', 'purple', etc)
  userId?: string; // ID do usuário Firebase
  createdAt?: number; // timestamp para ordenação
}

export interface CategorySummary {
  category: string;
  total: number;
  count: number;
  percentage: number;
}

// Categorias padrão de despesas
export const DEFAULT_EXPENSE_CATEGORIES: ExpenseCategory[] = ['Alimentação', 'Lazer', 'Moradia', 'Transporte', 'Outros'];

// Categorias padrão de ganhos
export const DEFAULT_INCOME_CATEGORIES: IncomeCategory[] = ['Salário', 'Freelance', 'Investimentos', 'Outros'];

// Cores para categorias
export const CATEGORY_COLORS: Record<string, string> = {
  'Alimentação': 'bg-emerald-500/20 text-emerald-400',
  'Lazer': 'bg-purple-500/20 text-purple-400',
  'Moradia': 'bg-blue-500/20 text-blue-400',
  'Transporte': 'bg-orange-500/20 text-orange-400',
  'Outros': 'bg-slate-500/20 text-slate-400',
  'Salário': 'bg-green-500/20 text-green-400',
  'Freelance': 'bg-cyan-500/20 text-cyan-400',
  'Investimentos': 'bg-amber-500/20 text-amber-400',
};

export const CATEGORY_ACCENT: Record<string, string> = {
  'Alimentação': 'emerald',
  'Lazer': 'purple',
  'Moradia': 'blue',
  'Transporte': 'orange',
  'Outros': 'slate',
  'Salário': 'green',
  'Freelance': 'cyan',
  'Investimentos': 'amber',
};

// Cores disponíveis para categorias personalizadas
export const AVAILABLE_COLORS = [
  'emerald', 'purple', 'blue', 'orange', 'slate',
  'green', 'cyan', 'amber', 'pink', 'indigo',
  'rose', 'teal', 'lime', 'fuchsia', 'sky'
];
