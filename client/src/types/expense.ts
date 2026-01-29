/**
 * Tipos para o sistema de controle de despesas
 * Design: Minimalismo Corporativo - estrutura de dados simples e clara
 */

export type ExpenseCategory = 'Alimentação' | 'Lazer' | 'Moradia' | 'Transporte' | 'Outros';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // ISO date string (YYYY-MM-DD)
  createdAt: number; // timestamp para ordenação
}

export interface CategorySummary {
  category: ExpenseCategory;
  total: number;
  count: number;
  percentage: number;
}

export const CATEGORIES: ExpenseCategory[] = ['Alimentação', 'Lazer', 'Moradia', 'Transporte', 'Outros'];

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  'Alimentação': 'bg-emerald-500/20 text-emerald-400',
  'Lazer': 'bg-purple-500/20 text-purple-400',
  'Moradia': 'bg-blue-500/20 text-blue-400',
  'Transporte': 'bg-orange-500/20 text-orange-400',
  'Outros': 'bg-slate-500/20 text-slate-400',
};

export const CATEGORY_ACCENT: Record<ExpenseCategory, string> = {
  'Alimentação': 'emerald',
  'Lazer': 'purple',
  'Moradia': 'blue',
  'Transporte': 'orange',
  'Outros': 'slate',
};
