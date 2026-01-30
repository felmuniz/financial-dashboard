/**
 * Página Dashboard Executivo
 * Design: Minimalismo Corporativo - visualização completa da saúde financeira
 */

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFirestoreExpenses } from '@/hooks/useFirestoreExpenses';
import { useIncomes } from '@/hooks/useIncomes';
import { useFixedAccounts } from '@/hooks/useFixedAccounts';
import FinancialHealthIndicators from '@/components/FinancialHealthIndicators';
import ExpenseDistributionChart from '@/components/ExpenseDistributionChart';
import MonthlyTrendChart from '@/components/MonthlyTrendChart';
import { Loader2 } from 'lucide-react';

interface MonthlyData {
  month: string;
  expenses: number;
  incomes: number;
  balance: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { expenses, loading: expensesLoading } = useFirestoreExpenses();
  const { incomes, isLoaded: incomesLoaded } = useIncomes();
  const { fixedAccounts, isLoaded: fixedAccountsLoaded } = useFixedAccounts();
  
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Calcular dados agregados
  const currentMonthExpenses = expenses
    .filter(e => e.date.startsWith(selectedMonth))
    .reduce((sum, e) => sum + e.amount, 0);

  const currentMonthIncomes = incomes
    .filter(i => i.date.startsWith(selectedMonth))
    .reduce((sum, i) => sum + i.amount, 0);

  const currentMonthFixedAccounts = fixedAccounts
    .filter(fa => {
      const dueDay = fa.dueDate;
      const month = selectedMonth;
      const year = month.split('-')[0];
      const monthNum = month.split('-')[1];
      const lastDay = new Date(parseInt(year), parseInt(monthNum), 0).getDate();
      return dueDay <= lastDay;
    })
    .reduce((sum, fa) => sum + fa.amount, 0);

  const totalBalance = currentMonthIncomes - currentMonthExpenses - currentMonthFixedAccounts;
  const savingsRate = currentMonthIncomes > 0 ? ((currentMonthIncomes - currentMonthExpenses - currentMonthFixedAccounts) / currentMonthIncomes) * 100 : 0;

  // Preparar dados para gráfico de distribuição
  const expensesByCategory = expenses
    .filter(e => e.date.startsWith(selectedMonth))
    .reduce((acc, e) => {
      const existing = acc.find(item => item.category === e.category);
      if (existing) {
        existing.total += e.amount;
      } else {
        acc.push({
          category: e.category,
          total: e.amount,
          percentage: 0,
        });
      }
      return acc;
    }, [] as any[]);

  // Calcular percentuais
  const totalExpensesForPercentage = expensesByCategory.reduce((sum, item) => sum + item.total, 0);
  expensesByCategory.forEach(item => {
    item.percentage = totalExpensesForPercentage > 0 ? (item.total / totalExpensesForPercentage) * 100 : 0;
  });

  // Preparar dados para gráfico de tendência mensal (últimos 6 meses)
  useEffect(() => {
    const months: MonthlyData[] = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });

      const monthExpenses = expenses
        .filter(e => e.date.startsWith(monthStr))
        .reduce((sum, e) => sum + e.amount, 0);

      const monthIncomes = incomes
        .filter(i => i.date.startsWith(monthStr))
        .reduce((sum, i) => sum + i.amount, 0);

      const monthBalance = monthIncomes - monthExpenses;

      months.push({
        month: monthName,
        expenses: monthExpenses,
        incomes: monthIncomes,
        balance: monthBalance,
      });
    }

    setMonthlyData(months);
  }, [expenses, incomes]);

  const isLoading = expensesLoading || !incomesLoaded || !fixedAccountsLoaded;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto" />
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Financeiro</h1>
        <p className="text-muted-foreground">Visualize sua saúde financeira em tempo real</p>
      </div>

      {/* Indicadores de Saúde Financeira */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Indicadores Financeiros</h2>
        <FinancialHealthIndicators
          totalIncome={currentMonthIncomes}
          totalExpenses={currentMonthExpenses}
          totalFixedAccounts={currentMonthFixedAccounts}
          balance={totalBalance}
          savingsRate={savingsRate}
        />
      </section>

      {/* Seletor de Período */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-foreground">Período:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de Distribuição de Despesas */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Distribuição de Despesas</h2>
          <ExpenseDistributionChart data={expensesByCategory} />
        </section>

        {/* Gráfico de Tendência Mensal */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Tendência dos Últimos 6 Meses</h2>
          <MonthlyTrendChart data={monthlyData} />
        </section>
      </div>

      {/* Resumo de Categorias */}
      <section className="bg-card rounded-lg border border-border/50 p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Resumo por Categoria</h2>
        {expensesByCategory.length > 0 ? (
          <div className="space-y-3">
            {expensesByCategory.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                  <span className="text-foreground font-medium">{item.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-muted-foreground text-sm w-16 text-right">
                    {item.percentage.toFixed(1)}%
                  </span>
                  <span className="text-foreground font-semibold w-24 text-right">
                    R$ {item.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">Nenhuma despesa registrada neste período</p>
        )}
      </section>
    </div>
  );
}
