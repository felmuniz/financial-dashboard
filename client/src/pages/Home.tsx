/**
 * Página principal do Dashboard de Controle Financeiro Pessoal
 * Design: Minimalismo Corporativo - layout assimétrico, espaçamento generoso, acentos vibrantes
 */

import { useExpenses } from '@/hooks/useExpenses';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseTable } from '@/components/ExpenseTable';
import { CategorySummary } from '@/components/CategorySummary';
import { TotalCard } from '@/components/TotalCard';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function Home() {
  const {
    expenses,
    addExpense,
    deleteExpense,
    getTotalAmount,
    getCategorySummary,
    exportToCSV,
    isLoaded,
  } = useExpenses();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  const total = getTotalAmount();
  const categorySummary = getCategorySummary();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display text-foreground">
                Controle Financeiro
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Gerencie suas despesas pessoais de forma simples e eficiente
              </p>
            </div>
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="border-border/50 text-foreground hover:bg-secondary/50 transition-colors duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Form and Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form */}
            <ExpenseForm onSubmit={addExpense} />

            {/* Total Card */}
            <TotalCard total={total} />

            {/* Table */}
            <ExpenseTable expenses={expenses} onDelete={deleteExpense} />
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CategorySummary summary={categorySummary} total={total} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-12">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>
            Dashboard de Controle Financeiro Pessoal • Dados salvos localmente no seu navegador
          </p>
        </div>
      </footer>
    </div>
  );
}
