/**
 * Hook customizado para gerenciar ganhos com sincronização Firestore
 * Design: Minimalismo Corporativo - lógica clara e sem efeitos colaterais
 */

import { useEffect, useState } from 'react';
import { Income, CategorySummary, DEFAULT_INCOME_CATEGORIES } from '@/types/expense';
import { nanoid } from 'nanoid';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where, Timestamp } from 'firebase/firestore';

export function useIncomes() {
  const { user } = useAuth();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7) // YYYY-MM format
  );

  // Sincronizar ganhos do Firestore
  useEffect(() => {
    if (!user) {
      setIncomes([]);
      setIsLoaded(true);
      return;
    }

    const q = query(collection(db, 'incomes'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedIncomes: Income[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        loadedIncomes.push({
          id: doc.id,
          name: data.name,
          amount: data.amount,
          category: data.category,
          date: data.date,
          userId: data.userId,
          createdAt: data.createdAt,
        });
      });
      setIncomes(loadedIncomes);
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, [user]);

  const addIncome = async (
    name: string,
    amount: number,
    category: string,
    date: string
  ) => {
    if (!user) return null;

    try {
      const docRef = await addDoc(collection(db, 'incomes'), {
        name,
        amount,
        category,
        date,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });

      return {
        id: docRef.id,
        name,
        amount,
        category,
        date,
        userId: user.uid,
        createdAt: Date.now(),
      };
    } catch (error) {
      console.error('Erro ao adicionar ganho:', error);
      return null;
    }
  };

  const deleteIncome = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'incomes', id));
    } catch (error) {
      console.error('Erro ao deletar ganho:', error);
    }
  };

  const getFilteredIncomes = (): Income[] => {
    return incomes.filter(inc => inc.date.startsWith(selectedMonth));
  };

  const getTotalAmount = (filtered: boolean = false): number => {
    const incomesToSum = filtered ? getFilteredIncomes() : incomes;
    return incomesToSum.reduce((sum, inc) => sum + inc.amount, 0);
  };

  const getCategorySummary = (filtered: boolean = false): CategorySummary[] => {
    const incomesToSummarize = filtered ? getFilteredIncomes() : incomes;
    const totals: Record<string, number> = {};
    const counts: Record<string, number> = {};

    incomesToSummarize.forEach(inc => {
      totals[inc.category] = (totals[inc.category] || 0) + inc.amount;
      counts[inc.category] = (counts[inc.category] || 0) + 1;
    });

    const total = getTotalAmount(filtered);

    return Object.keys(totals).map(category => ({
      category,
      total: totals[category] || 0,
      count: counts[category] || 0,
      percentage: total > 0 ? (totals[category] || 0) / total * 100 : 0,
    })).filter(item => item.total > 0);
  };

  return {
    incomes,
    addIncome,
    deleteIncome,
    getTotalAmount,
    getCategorySummary,
    isLoaded,
    selectedMonth,
    setSelectedMonth,
    getFilteredIncomes,
  };
}
