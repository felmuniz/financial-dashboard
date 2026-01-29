/**
 * Hook para sincronizar despesas com Firestore em tempo real
 * Design: Minimalismo Corporativo - gerenciamento eficiente de dados em nuvem
 */

import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Expense } from '@/types/expense';

export function useFirestoreExpenses() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sincronizar despesas em tempo real
  useEffect(() => {
    if (!user) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, 'expenses'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const expensesList: Expense[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          expensesList.push({
            id: doc.id,
            name: data.name,
            amount: data.amount,
            category: data.category,
            date: data.date,
            userId: data.userId,
            createdAt: data.createdAt
          });
        });
        // Ordenar por data descendente
        expensesList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setExpenses(expensesList);
        setLoading(false);
      },
      (err) => {
        console.error('Erro ao sincronizar despesas:', err);
        setError('Erro ao carregar despesas');
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const addExpense = async (expense: Omit<Expense, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) {
      setError('Você deve estar autenticado');
      return;
    }

    try {
      setError(null);
      await addDoc(collection(db, 'expenses'), {
        ...expense,
        userId: user.uid,
        createdAt: Timestamp.now()
      });
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao adicionar despesa';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      setError(null);
      await deleteDoc(doc(db, 'expenses', id));
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao deletar despesa';
      setError(errorMessage);
      throw err;
    }
  };

  const getTotalAmount = (filteredExpenses?: Expense[]) => {
    const list = filteredExpenses || expenses;
    return list.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getCategorySummary = (filteredExpenses?: Expense[]) => {
    const list = filteredExpenses || expenses;
    const summary: Record<string, { amount: number; count: number }> = {};

    list.forEach((expense) => {
      if (!summary[expense.category]) {
        summary[expense.category] = { amount: 0, count: 0 };
      }
      summary[expense.category].amount += expense.amount;
      summary[expense.category].count += 1;
    });

    const total = getTotalAmount(list);
    return Object.entries(summary).map(([category, data]) => ({
      category,
      amount: data.amount,
      count: data.count,
      percentage: total > 0 ? (data.amount / total) * 100 : 0
    }));
  };

  return {
    expenses,
    loading,
    error,
    addExpense,
    deleteExpense,
    getTotalAmount,
    getCategorySummary
  };
}
