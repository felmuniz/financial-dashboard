/**
 * Página de Ganhos
 * Design: Minimalismo Corporativo - layout assimétrico com formulário e resumo
 */

import { useIncomes } from '@/hooks/useIncomes';
import { useCustomCategories } from '@/hooks/useCustomCategories';
import { IncomeForm } from '@/components/IncomeForm';
import { IncomeTable } from '@/components/IncomeTable';
import { IncomeSummary } from '@/components/IncomeSummary';
import { MonthFilter } from '@/components/MonthFilter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function IncomesPage() {
  const {
    incomes,
    addIncome,
    deleteIncome,
    getTotalAmount,
    getCategorySummary,
    isLoaded,
    selectedMonth,
    setSelectedMonth,
    getFilteredIncomes,
  } = useIncomes();

  const { categories, getCategoriesByType } = useCustomCategories();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Carregando ganhos...</p>
      </div>
    );
  }

  const filteredIncomes = getFilteredIncomes();
  const totalAmount = getTotalAmount(true);
  const categorySummary = getCategorySummary(true);
  const incomeCategories = getCategoriesByType('income');

  const handleAddIncome = async (name: string, amount: number, category: string, date: string) => {
    const result = await addIncome(name, amount, category, date);
    if (result) {
      // Toast de sucesso (opcional)
    }
  };

  const handleDeleteIncome = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este ganho?')) {
      deleteIncome(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtro de Período */}
      <MonthFilter selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Esquerda - Formulário */}
        <div className="lg:col-span-1 space-y-6">
          <IncomeForm
            onSubmit={handleAddIncome}
            categories={incomeCategories}
          />

          {/* Card de Total */}
          <Card className="border-border/50 shadow-sm bg-gradient-to-br from-green-500/10 to-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">TOTAL GANHOS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">
                R$ {totalAmount.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Acumulado no período
              </p>
            </CardContent>
          </Card>

          {/* Resumo por Categoria */}
          <IncomeSummary summary={categorySummary} total={totalAmount} />
        </div>

        {/* Coluna Direita - Tabela */}
        <div className="lg:col-span-2">
          <IncomeTable incomes={filteredIncomes} onDelete={handleDeleteIncome} />
        </div>
      </div>
    </div>
  );
}
