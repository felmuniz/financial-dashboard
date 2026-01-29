/**
 * Hook customizado para gerenciar despesas com persistência em localStorage
 * Design: Minimalismo Corporativo - lógica clara e sem efeitos colaterais
 */

import { useEffect, useState } from 'react';
import { Expense, CategorySummary, CATEGORIES } from '@/types/expense';
import { nanoid } from 'nanoid';

const STORAGE_KEY = 'financial_dashboard_expenses';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar despesas do localStorage ao montar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setExpenses(parsed);
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
        setExpenses([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Salvar despesas no localStorage sempre que mudam
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }
  }, [expenses, isLoaded]);

  const addExpense = (
    name: string,
    amount: number,
    category: string,
    date: string
  ) => {
    const newExpense: Expense = {
      id: nanoid(),
      name,
      amount,
      category: category as any,
      date,
      createdAt: Date.now(),
    };
    setExpenses([newExpense, ...expenses]);
    return newExpense;
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const getTotalAmount = (): number => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  };

  const getCategorySummary = (): CategorySummary[] => {
    const totals: Record<string, number> = {};
    const counts: Record<string, number> = {};

    expenses.forEach(exp => {
      totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
      counts[exp.category] = (counts[exp.category] || 0) + 1;
    });

    const total = getTotalAmount();

    return CATEGORIES.map(category => ({
      category,
      total: totals[category] || 0,
      count: counts[category] || 0,
      percentage: total > 0 ? (totals[category] || 0) / total * 100 : 0,
    })).filter(item => item.total > 0);
  };

  const exportToCSV = () => {
    if (expenses.length === 0) {
      alert('Nenhuma despesa para exportar');
      return;
    }

    const headers = ['Data', 'Descrição', 'Categoria', 'Valor'];
    const rows = expenses
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(exp => [
        exp.date,
        exp.name,
        exp.category,
        exp.amount.toFixed(2),
      ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
      '',
      ['TOTAL', '', '', getTotalAmount().toFixed(2)].join(','),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `despesas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    expenses,
    addExpense,
    deleteExpense,
    getTotalAmount,
    getCategorySummary,
    exportToCSV,
    isLoaded,
  };
}
