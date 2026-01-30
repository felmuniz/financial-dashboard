/**
 * Hook customizado para gerenciar contas fixas com sincronização Firestore
 * Design: Minimalismo Corporativo - lógica clara e sem efeitos colaterais
 */

import { useEffect, useState } from 'react';
import { FixedAccount } from '@/types/expense';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where, updateDoc, Timestamp } from 'firebase/firestore';

export function useFixedAccounts() {
  const { user } = useAuth();
  const [fixedAccounts, setFixedAccounts] = useState<FixedAccount[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sincronizar contas fixas do Firestore
  useEffect(() => {
    if (!user) {
      setFixedAccounts([]);
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
    const q = query(collection(db, 'fixedAccounts'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const loadedAccounts: FixedAccount[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          loadedAccounts.push({
            id: doc.id,
            name: data.name || '',
            amount: Number(data.amount) || 0,
            category: data.category || 'Outros',
            dueDate: Number(data.dueDate) || 1,
            isActive: data.isActive !== false,
            userId: data.userId,
            createdAt: data.createdAt?.toMillis?.() || Date.now(),
          });
        });
        setFixedAccounts(loadedAccounts);
        setIsLoaded(true);
      },
      (error) => {
        console.error('Erro ao carregar contas fixas:', error);
        setIsLoaded(true);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addFixedAccount = async (
    name: string,
    amount: number,
    category: string,
    dueDate: number
  ): Promise<FixedAccount | null> => {
    if (!user) return null;

    try {
      const docRef = await addDoc(collection(db, 'fixedAccounts'), {
        name: name.trim(),
        amount: Number(amount),
        category: category || 'Outros',
        dueDate: Number(dueDate) || 1,
        isActive: true,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });

      return {
        id: docRef.id,
        name: name.trim(),
        amount: Number(amount),
        category: category || 'Outros',
        dueDate: Number(dueDate) || 1,
        isActive: true,
        userId: user.uid,
        createdAt: Date.now(),
      };
    } catch (error) {
      console.error('Erro ao adicionar conta fixa:', error);
      return null;
    }
  };

  const deleteFixedAccount = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'fixedAccounts', id));
    } catch (error) {
      console.error('Erro ao deletar conta fixa:', error);
    }
  };

  const updateFixedAccount = async (id: string, updates: Partial<FixedAccount>) => {
    try {
      await updateDoc(doc(db, 'fixedAccounts', id), updates);
    } catch (error) {
      console.error('Erro ao atualizar conta fixa:', error);
    }
  };

  const getTotalAmount = (): number => {
    return fixedAccounts
      .filter(acc => acc.isActive)
      .reduce((sum, acc) => sum + (Number(acc.amount) || 0), 0);
  };

  const getAccountsByCategory = (): Record<string, FixedAccount[]> => {
    const grouped: Record<string, FixedAccount[]> = {};
    fixedAccounts.filter(acc => acc.isActive).forEach(acc => {
      const category = acc.category || 'Outros';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(acc);
    });
    return grouped;
  };

  return {
    fixedAccounts,
    addFixedAccount,
    deleteFixedAccount,
    updateFixedAccount,
    getTotalAmount,
    getAccountsByCategory,
    isLoaded,
  };
}
