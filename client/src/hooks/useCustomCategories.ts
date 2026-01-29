/**
 * Hook customizado para gerenciar categorias personalizadas com sincronização Firestore
 * Design: Minimalismo Corporativo - lógica clara e sem efeitos colaterais
 */

import { useEffect, useState } from 'react';
import { CustomCategory, DEFAULT_EXPENSE_CATEGORIES, DEFAULT_INCOME_CATEGORIES, AVAILABLE_COLORS } from '@/types/expense';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where, Timestamp } from 'firebase/firestore';

export function useCustomCategories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<CustomCategory[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sincronizar categorias do Firestore
  useEffect(() => {
    if (!user) {
      setCategories([]);
      setIsLoaded(true);
      return;
    }

    const q = query(collection(db, 'customCategories'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedCategories: CustomCategory[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        loadedCategories.push({
          id: doc.id,
          name: data.name,
          type: data.type,
          color: data.color,
          userId: data.userId,
          createdAt: data.createdAt,
        });
      });
      setCategories(loadedCategories);
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, [user]);

  const addCategory = async (
    name: string,
    type: 'expense' | 'income' | 'fixed',
    color: string = 'emerald'
  ) => {
    if (!user) return null;

    // Validar nome único
    if (categories.some(cat => cat.name.toLowerCase() === name.toLowerCase())) {
      console.error('Categoria com este nome já existe');
      return null;
    }

    try {
      const docRef = await addDoc(collection(db, 'customCategories'), {
        name,
        type,
        color,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });

      return {
        id: docRef.id,
        name,
        type,
        color,
        userId: user.uid,
        createdAt: Date.now(),
      };
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      return null;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'customCategories', id));
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
    }
  };

  const getCategoriesByType = (type: 'expense' | 'income' | 'fixed'): string[] => {
    const defaults = type === 'expense' 
      ? DEFAULT_EXPENSE_CATEGORIES 
      : type === 'income' 
      ? DEFAULT_INCOME_CATEGORIES 
      : [];
    
    const custom = categories
      .filter(cat => cat.type === type)
      .map(cat => cat.name);

    return [...defaults, ...custom];
  };

  const getCategoryColor = (categoryName: string): string => {
    const custom = categories.find(cat => cat.name === categoryName);
    if (custom) {
      return `bg-${custom.color}-500/20 text-${custom.color}-400`;
    }
    // Retornar cor padrão se existir
    const defaultColors: Record<string, string> = {
      'Alimentação': 'bg-emerald-500/20 text-emerald-400',
      'Lazer': 'bg-purple-500/20 text-purple-400',
      'Moradia': 'bg-blue-500/20 text-blue-400',
      'Transporte': 'bg-orange-500/20 text-orange-400',
      'Outros': 'bg-slate-500/20 text-slate-400',
      'Salário': 'bg-green-500/20 text-green-400',
      'Freelance': 'bg-cyan-500/20 text-cyan-400',
      'Investimentos': 'bg-amber-500/20 text-amber-400',
    };
    return defaultColors[categoryName] || 'bg-slate-500/20 text-slate-400';
  };

  return {
    categories,
    addCategory,
    deleteCategory,
    getCategoriesByType,
    getCategoryColor,
    isLoaded,
    availableColors: AVAILABLE_COLORS,
  };
}
