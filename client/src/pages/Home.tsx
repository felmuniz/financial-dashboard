/**
 * Página Home - Dashboard com sincronização Firestore e navegação por abas
 * Design: Minimalismo Corporativo Mobile-First - responsivo e sincronizado em tempo real
 */

import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFirestoreExpenses } from '@/hooks/useFirestoreExpenses';
import { useLocation } from 'wouter';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseTable } from '@/components/ExpenseTable';
import { CategorySummary } from '@/components/CategorySummary';
import { TotalCard } from '@/components/TotalCard';
import { MonthFilter } from '@/components/MonthFilter';
import { Button } from '@/components/ui/button';
import { LogOut, Download, Loader2, BarChart3, TrendingUp, Settings } from 'lucide-react';
import { toast } from 'sonner';
import IncomesPage from './IncomesPage';
import FixedAccountsPage from './FixedAccountsPage';
import CategoriesPage from './CategoriesPage';

export default function Home() {
  const { user, logout } = useAuth();
  const { expenses, loading, error, addExpense, deleteExpense, getTotalAmount, getCategorySummary } = useFirestoreExpenses();
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<'expenses' | 'incomes' | 'fixed' | 'categories'>('expenses');

  // Filtrar despesas por mês
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => expense.date.startsWith(selectedMonth));
  }, [expenses, selectedMonth]);

  const handleAddExpense = async (name: string, amount: number, category: string, date: string) => {
    try {
      await addExpense({
        name,
        amount,
        category: category as any,
        date
      });
      toast.success('Despesa adicionada com sucesso!');
    } catch (err) {
      toast.error('Erro ao adicionar despesa');
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id);
      toast.success('Despesa removida com sucesso!');
    } catch (err) {
      toast.error('Erro ao remover despesa');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      toast.error('Erro ao fazer logout');
    }
  };

  const handleExportCSV = () => {
    if (filteredExpenses.length === 0) {
      toast.error('Nenhuma despesa para exportar');
      return;
    }

    const headers = ['Data', 'Descrição', 'Categoria', 'Valor'];
    const rows = filteredExpenses.map(expense => [
      expense.date,
      expense.name,
      expense.category,
      `R$ ${expense.amount.toFixed(2)}`
    ]);

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `despesas_${selectedMonth}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exportado com sucesso!');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={handleLogout}>Voltar ao Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Mobile-First */}
      <header className="sticky top-0 z-50 bg-card border-b border-border/50 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
              Controle Financeiro
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={handleExportCSV}
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2"
              disabled={activeTab !== 'expenses'}
            >
              <Download className="w-4 h-4" />
              Exportar
            </Button>
            <Button
              onClick={handleExportCSV}
              variant="outline"
              size="sm"
              className="sm:hidden p-2"
              disabled={activeTab !== 'expenses'}
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="sm:hidden p-2"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 py-2">
            <Button
              variant={activeTab === 'expenses' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('expenses')}
              className="whitespace-nowrap"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Despesas
            </Button>
            <Button
              variant={activeTab === 'incomes' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('incomes')}
              className="whitespace-nowrap"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Ganhos
            </Button>
            <Button
              variant={activeTab === 'fixed' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('fixed')}
              className="whitespace-nowrap"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Contas Fixas
            </Button>
            <Button
              variant={activeTab === 'categories' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('categories')}
              className="whitespace-nowrap"
            >
              <Settings className="w-4 h-4 mr-2" />
              Categorias
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Aba de Despesas */}
        {activeTab === 'expenses' && (
          <>
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">Carregando despesas...</p>
                </div>
              </div>
            )}

            {!loading && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Left Column - Form e Tabela */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  {/* Filtro de Período */}
                  <MonthFilter selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />

                  {/* Formulário */}
                  <ExpenseForm onSubmit={handleAddExpense} isLoading={loading} />

                  {/* Tabela */}
                  <ExpenseTable expenses={filteredExpenses} onDelete={handleDeleteExpense} />
                </div>

                {/* Right Column - Resumos (Sidebar no Desktop, abaixo no Mobile) */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Total Geral */}
                  <TotalCard total={getTotalAmount(filteredExpenses)} />

                  {/* Resumo por Categoria */}
                  <CategorySummary summary={getCategorySummary(filteredExpenses)} />
                </div>
              </div>
            )}
          </>
        )}

        {/* Aba de Ganhos */}
        {activeTab === 'incomes' && <IncomesPage />}

        {/* Aba de Contas Fixas */}
        {activeTab === 'fixed' && <FixedAccountsPage />}

        {/* Aba de Categorias */}
        {activeTab === 'categories' && <CategoriesPage />}
      </main>
    </div>
  );
}
